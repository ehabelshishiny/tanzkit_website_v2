import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function populateAppsPageShowcaseMetadata() {
  console.log('🚀 Starting Apps Page Showcase Metadata Population...\n');

  try {
    // Fetch the existing apps page document
    const appsPage = await client.fetch(`*[_type == "appsPage"][0]`);

    if (!appsPage) {
      console.error('❌ Apps Page document not found!');
      return;
    }

    console.log('✅ Found Apps Page document:', appsPage._id);

    // Prepare the showcase metadata
    const showcaseMetadata = {
      title: {
        en: 'Powerful Apps for Every User',
        ar: 'تطبيقات قوية لكل مستخدم',
      },
      subtitle: {
        en: 'Download our suite of mobile and web applications designed for supervisors, drivers, riders, operators, and enterprises. Experience seamless transportation management at your fingertips.',
        ar: 'قم بتنزيل مجموعة تطبيقاتنا المحمولة والويب المصممة للمشرفين والسائقين والركاب والمشغلين والمؤسسات. استمتع بتجربة إدارة نقل سلسة في متناول يدك.',
      },
      operatorsSegment: {
        title: {
          en: 'Operators Dashboard',
          ar: 'لوحة تحكم المشغلين',
        },
        description: {
          en: 'Complete fleet management ecosystem for transportation operators',
          ar: 'نظام إدارة أسطول شامل لمشغلي النقل',
        },
        tabLabel: {
          en: 'Operators',
          ar: 'المشغلون',
        },
      },
      enterpriseSegment: {
        title: {
          en: 'Enterprise Dashboard',
          ar: 'لوحة تحكم المؤسسة',
        },
        description: {
          en: 'Strategic mobility platform for corporate transportation programs',
          ar: 'منصة تنقل استراتيجية لبرامج النقل المؤسسي',
        },
        tabLabel: {
          en: 'Enterprise',
          ar: 'المؤسسات',
        },
      },
    };

    // Update the apps page document with the new showcase metadata
    const result = await client
      .patch(appsPage._id)
      .set({
        'showcase.title': showcaseMetadata.title,
        'showcase.subtitle': showcaseMetadata.subtitle,
        'showcase.operatorsSegment': showcaseMetadata.operatorsSegment,
        'showcase.enterpriseSegment': showcaseMetadata.enterpriseSegment,
      })
      .commit();

    console.log('\n✅ Successfully updated Apps Page showcase metadata!');
    console.log('📝 Updated fields:');
    console.log('  - showcase.title');
    console.log('  - showcase.subtitle');
    console.log('  - showcase.operatorsSegment (title, description, tabLabel)');
    console.log('  - showcase.enterpriseSegment (title, description, tabLabel)');
    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('  1. Verify the data in Sanity Studio');
    console.log('  2. Test the apps page in the frontend');
    console.log('  3. Remove translation keys from messages/en.json and messages/ar.json');

  } catch (error) {
    console.error('❌ Error during migration:', error);
    throw error;
  }
}

// Run the migration
populateAppsPageShowcaseMetadata()
  .then(() => {
    console.log('\n✅ Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration script failed:', error);
    process.exit(1);
  });

