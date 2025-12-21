/**
 * Test the exact query used by the frontend
 */

import { getCliClient } from 'sanity/cli';

const client = getCliClient();

const localizedField = (field: string, locale: string) => {
  return `"${field}": ${field}.${locale}`;
};

const imageProjection = `{
  _type,
  asset->{
    _id,
    url
  }
}`;

async function testFrontendQuery() {
  const locale = 'en';
  
  const query = `*[_type == "appsPage" && !(_id in path("drafts.**"))][0] {
    _id,
    hero {
      ${localizedField('titlePart1', locale)},
      ${localizedField('titlePart2', locale)},
      ${localizedField('titlePart3', locale)},
      ${localizedField('subtitle', locale)}
    },
    showcase {
      "operatorApps": operatorApps[]-> {
        _id,
        _type,
        ${localizedField('name', locale)},
        slug,
        ${localizedField('tagline', locale)},
        ${localizedField('description', locale)},
        category,
        layoutType,
        "benefits": benefits[].${locale},
        screenshots[] ${imageProjection},
        platforms,
        storeUrls,
        order
      },
      "enterpriseApps": enterpriseApps[]-> {
        _id,
        _type,
        ${localizedField('name', locale)},
        slug,
        ${localizedField('tagline', locale)},
        ${localizedField('description', locale)},
        category,
        layoutType,
        "benefits": benefits[].${locale},
        screenshots[] ${imageProjection},
        platforms,
        storeUrls,
        order
      }
    },
    cta {
      ${localizedField('title', locale)},
      ${localizedField('subtitle', locale)},
      primaryButton {
        ${localizedField('text', locale)},
        url
      },
      secondaryButton {
        ${localizedField('text', locale)},
        url
      }
    },
    seo {
      ${localizedField('title', locale)},
      ${localizedField('description', locale)},
      keywords
    }
  }`;

  console.log('🔍 Testing Frontend Query...\n');
  console.log('Query:', query);
  console.log('\n---\n');

  const result = await client.fetch(query);

  console.log('📊 Query Result:');
  console.log(JSON.stringify(result, null, 2));

  console.log('\n---\n');
  console.log('📱 Showcase Apps:');
  console.log('Operator Apps:', result.showcase?.operatorApps?.length || 0);
  console.log('Enterprise Apps:', result.showcase?.enterpriseApps?.length || 0);

  if (result.showcase?.operatorApps) {
    console.log('\n✅ Operator Apps:');
    result.showcase.operatorApps.forEach((app: any) => {
      console.log(`   - ${app.name} (${app.category})`);
      console.log(`     Screenshots: ${app.screenshots?.length || 0}`);
      console.log(`     Benefits: ${app.benefits?.length || 0}`);
    });
  }

  if (result.showcase?.enterpriseApps) {
    console.log('\n✅ Enterprise Apps:');
    result.showcase.enterpriseApps.forEach((app: any) => {
      console.log(`   - ${app.name} (${app.category})`);
      console.log(`     Screenshots: ${app.screenshots?.length || 0}`);
      console.log(`     Benefits: ${app.benefits?.length || 0}`);
    });
  }
}

testFrontendQuery()
  .then(() => {
    console.log('\n✅ Test completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });

