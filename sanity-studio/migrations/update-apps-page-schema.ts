/**
 * Migration script to update Apps Page with new schema structure
 * Run this with: npx sanity exec migrations/update-apps-page-schema.ts --with-user-token
 */

import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function updateAppsPage() {
  console.log('🔄 Starting migration for Apps Page schema update...');

  // Fetch the apps page document
  const query = `*[_type == "appsPage"][0]`;
  let doc = await client.fetch(query);

  // If document doesn't exist, create it
  if (!doc) {
    console.log('📝 Creating new Apps Page document...');
    doc = await client.create({
      _type: 'appsPage',
      title: 'Apps Page',
    });
    console.log('✅ Created document:', doc._id);
  } else {
    console.log('✅ Found existing document:', doc._id);
    console.log('📄 Current document structure:', JSON.stringify(doc, null, 2));
  }

  // Fetch all apps to populate the showcase section
  const appsQuery = `*[_type == "app"] | order(order asc) {
    _id,
    category,
    slug,
    name
  }`;
  const apps = await client.fetch(appsQuery);

  console.log(`\n📱 Total apps found: ${apps.length}`);

  if (apps.length === 0) {
    console.warn('⚠️  No apps found in the database. Please create some apps first.');
    console.log('Continuing with migration but showcase will be empty...\n');
  }

  const operatorApps = apps.filter((app: any) => app.category === 'operators').slice(0, 3);
  const enterpriseApps = apps.filter((app: any) => app.category === 'enterprise').slice(0, 2);

  console.log(`📱 Operator apps (${operatorApps.length}):`, operatorApps.map((a: any) => a.name || a.slug).join(', ') || 'None');
  console.log(`📱 Enterprise apps (${enterpriseApps.length}):`, enterpriseApps.map((a: any) => a.name || a.slug).join(', ') || 'None');

  console.log('\n🔧 Preparing to update document...');

  // Prepare the update - unset old showcase fields and set new structure
  const patch = client.patch(doc._id);

  // Remove old showcase fields if they exist
  if (doc.showcase?.heading || doc.showcase?.subtitle) {
    console.log('🗑️  Removing old showcase.heading and showcase.subtitle fields...');
    patch.unset(['showcase.heading', 'showcase.subtitle']);
  }

  // Set new schema structure
  const updateData: any = {
    hero: {
      titlePart1: {
        en: 'Intelligent',
        ar: 'نظام',
      },
      titlePart2: {
        en: 'Application',
        ar: 'التطبيقات',
      },
      titlePart3: {
        en: 'Ecosystem',
        ar: 'الذكية',
      },
      subtitle: {
        en: 'Discover our comprehensive suite of mobile and web applications designed to revolutionize workforce mobility across every role',
        ar: 'اكتشف مجموعتنا الشاملة من تطبيقات الهاتف المحمول والويب المصممة لإحداث ثورة في تنقل القوى العاملة عبر كل دور',
      },
    },
  };

  // Only add apps if they exist
  if (operatorApps.length > 0) {
    updateData['showcase.operatorApps'] = operatorApps.map((app: any) => ({
      _type: 'reference',
      _ref: app._id,
      _key: app._id,
    }));
  }

  if (enterpriseApps.length > 0) {
    updateData['showcase.enterpriseApps'] = enterpriseApps.map((app: any) => ({
      _type: 'reference',
      _ref: app._id,
      _key: app._id,
    }));
  }

  // Preserve existing CTA if it exists, otherwise don't touch it
  if (!doc.cta) {
    console.log('ℹ️  No existing CTA section found - you can add it manually in Sanity Studio');
  }

  patch.set(updateData);

  console.log('\n📝 Committing changes...');
  await patch.commit();

  // Fetch the updated document to verify
  const updatedDoc = await client.fetch(`*[_type == "appsPage"][0]`);

  console.log('\n✅ Successfully updated Apps Page with new schema structure');
  console.log('📋 Hero section:', updatedDoc.hero ? '✓ Populated' : '✗ Missing');
  console.log(`📱 Operator apps: ${updatedDoc.showcase?.operatorApps?.length || 0} apps`);
  console.log(`📱 Enterprise apps: ${updatedDoc.showcase?.enterpriseApps?.length || 0} apps`);
  console.log('📣 CTA section:', updatedDoc.cta ? '✓ Present' : '✗ Not set (add manually in Studio)');
  console.log('\n🎉 Migration completed successfully!');
  console.log('\n📌 Next steps:');
  console.log('   1. Open Sanity Studio and check the Apps Page document');
  console.log('   2. Add or update the CTA section if needed');
  console.log('   3. Select different apps for showcase if desired');
  console.log('   4. Verify the changes on your frontend');
}

updateAppsPage()
  .then(() => {
    console.log('✅ Migration finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  });

