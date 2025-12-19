/**
 * Complete setup script for Apps Page
 * This will check for existing apps and create the apps page with proper references
 * Run this with: npx sanity exec migrations/setup-apps-page-complete.ts --with-user-token
 */

import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function setupAppsPage() {
  console.log('🚀 Starting complete Apps Page setup...\n');

  // Step 1: Check for existing apps
  console.log('📱 Step 1: Checking for existing apps...');
  const appsQuery = `*[_type == "app"] | order(order asc) {
    _id,
    "name": name.en,
    category,
    slug
  }`;
  const apps = await client.fetch(appsQuery);

  console.log(`   Found ${apps.length} apps in database`);
  
  if (apps.length > 0) {
    console.log('   Apps:');
    apps.forEach((app: any) => {
      console.log(`   - ${app.name} (${app.category}) [${app.slug.current || app.slug}]`);
    });
  } else {
    console.log('   ⚠️  No apps found!');
    console.log('   ℹ️  You need to create App documents in Sanity Studio first.');
    console.log('   ℹ️  Go to Sanity Studio > Apps and create your app documents.');
    console.log('\n   Continuing anyway - you can add apps to the page later...\n');
  }

  // Step 2: Get or create Apps Page document
  console.log('\n📄 Step 2: Setting up Apps Page document...');
  const pageQuery = `*[_type == "appsPage"][0]`;
  let doc = await client.fetch(pageQuery);

  if (!doc) {
    console.log('   Creating new Apps Page document...');
    doc = await client.create({
      _type: 'appsPage',
      title: 'Apps Page',
    });
    console.log('   ✅ Created document:', doc._id);
  } else {
    console.log('   ✅ Found existing document:', doc._id);
  }

  // Step 3: Prepare app references
  console.log('\n📱 Step 3: Preparing app references...');
  const operatorApps = apps.filter((app: any) => app.category === 'operators').slice(0, 3);
  const enterpriseApps = apps.filter((app: any) => app.category === 'enterprise').slice(0, 2);

  console.log(`   Operator apps: ${operatorApps.length} (max 3)`);
  operatorApps.forEach((app: any) => console.log(`   - ${app.name}`));
  
  console.log(`   Enterprise apps: ${enterpriseApps.length} (max 2)`);
  enterpriseApps.forEach((app: any) => console.log(`   - ${app.name}`));

  // Step 4: Update the document
  console.log('\n🔧 Step 4: Updating Apps Page with new schema...');
  
  const patch = client.patch(doc._id);

  // Remove old showcase fields if they exist
  if (doc.showcase?.heading || doc.showcase?.subtitle) {
    console.log('   Removing old showcase fields...');
    patch.unset(['showcase.heading', 'showcase.subtitle']);
  }

  // Prepare update data
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

  // Add app references if apps exist
  if (operatorApps.length > 0) {
    updateData['showcase.operatorApps'] = operatorApps.map((app: any, index: number) => ({
      _type: 'reference',
      _ref: app._id,
      _key: `operator-${index}`,
    }));
  }

  if (enterpriseApps.length > 0) {
    updateData['showcase.enterpriseApps'] = enterpriseApps.map((app: any, index: number) => ({
      _type: 'reference',
      _ref: app._id,
      _key: `enterprise-${index}`,
    }));
  }

  patch.set(updateData);
  await patch.commit();

  // Step 5: Verify the update
  console.log('\n✅ Step 5: Verifying the update...');
  const updatedDoc = await client.fetch(`*[_type == "appsPage"][0]{
    _id,
    hero,
    "operatorAppsCount": count(showcase.operatorApps),
    "enterpriseAppsCount": count(showcase.enterpriseApps),
    cta
  }`);

  console.log('\n📊 Final Status:');
  console.log('   ✅ Hero Section:', updatedDoc.hero ? 'Populated' : 'Missing');
  console.log(`   📱 Operator Apps: ${updatedDoc.operatorAppsCount || 0}/3`);
  console.log(`   📱 Enterprise Apps: ${updatedDoc.enterpriseAppsCount || 0}/2`);
  console.log('   📣 CTA Section:', updatedDoc.cta ? 'Present' : 'Not set');

  console.log('\n🎉 Setup completed successfully!');
  
  if (!updatedDoc.cta) {
    console.log('\n⚠️  Action Required:');
    console.log('   The CTA section is not set. Please add it manually in Sanity Studio.');
  }
  
  if (apps.length === 0) {
    console.log('\n⚠️  Action Required:');
    console.log('   No apps found. Please create App documents in Sanity Studio,');
    console.log('   then add them to the Apps Page showcase section.');
  }
}

setupAppsPage()
  .then(() => {
    console.log('\n✅ Migration finished');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  });

