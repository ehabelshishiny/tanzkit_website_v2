/**
 * Migration script to populate Apps Page with default content
 * Run this with: npx sanity exec migrations/populate-apps-page.ts --with-user-token
 */

import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function migrateAppsPage() {
  console.log('🔄 Starting migration for Apps Page...');

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
  }

  console.log('🔄 Populating with default content...');

  // Prepare the content update
  const updates = {
    // Showcase Section
    showcase: {
      heading: {
        en: 'Choose Your App',
        ar: 'اختر تطبيقك',
      },
      subtitle: {
        en: 'Select the app that matches your role in the transportation ecosystem',
        ar: 'اختر التطبيق الذي يتناسب مع دورك في نظام النقل',
      },
    },

    // CTA Section
    cta: {
      heading: {
        en: 'Ready to Get Started?',
        ar: 'هل أنت مستعد للبدء؟',
      },
      subtitle: {
        en: 'Download our apps and experience the future of transportation management',
        ar: 'قم بتنزيل تطبيقاتنا واختبر مستقبل إدارة النقل',
      },
      primaryCta: {
        text: {
          en: 'Contact Sales',
          ar: 'اتصل بالمبيعات',
        },
        href: '/contact',
        openInNewTab: false,
      },
      secondaryCta: {
        text: {
          en: 'View Pricing',
          ar: 'عرض الأسعار',
        },
        href: '/pricing',
        openInNewTab: false,
      },
    },
  };

  // Update the document
  console.log('🔄 Updating document...');
  await client.patch(doc._id).set(updates).commit();

  console.log('✅ Migration completed successfully!');
  console.log('📝 Populated sections:');
  console.log('  ✅ Showcase Section');
  console.log('  ✅ CTA Section');
  console.log('\n🎉 Done! Your Apps Page is ready.');
  console.log('💡 Note: Hero section is hardcoded in the component (not in Sanity)');
}

migrateAppsPage().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});

