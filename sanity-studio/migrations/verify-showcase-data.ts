import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function verifyShowcaseData() {
  console.log('🔍 Verifying Apps Page Showcase Data...\n');

  try {
    const appsPage = await client.fetch(`
      *[_type == "appsPage"][0] {
        _id,
        showcase {
          title,
          subtitle,
          operatorsSegment {
            title,
            description,
            tabLabel
          },
          enterpriseSegment {
            title,
            description,
            tabLabel
          },
          "operatorAppsCount": count(operatorApps),
          "enterpriseAppsCount": count(enterpriseApps)
        }
      }
    `);

    if (!appsPage) {
      console.error('❌ Apps Page not found!');
      return;
    }

    console.log('✅ Apps Page Data:');
    console.log(JSON.stringify(appsPage, null, 2));

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

verifyShowcaseData();

