/**
 * Diagnostic script to check Apps Page data
 */

import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function checkAppsPage() {
  console.log('🔍 Checking Apps Page data...\n');

  // Check apps page document
  const appsPage = await client.fetch(`*[_type == "appsPage"][0]{
    _id,
    showcase {
      operatorApps,
      enterpriseApps
    }
  }`);

  console.log('📄 Apps Page Document:');
  console.log(JSON.stringify(appsPage, null, 2));
  console.log('\n');

  // Check if apps are referenced
  if (appsPage?.showcase?.operatorApps) {
    console.log(`✅ Operator Apps: ${appsPage.showcase.operatorApps.length} references found`);
    console.log('   References:', appsPage.showcase.operatorApps.map((ref: any) => ref._ref));
  } else {
    console.log('❌ No operator apps referenced');
  }

  if (appsPage?.showcase?.enterpriseApps) {
    console.log(`✅ Enterprise Apps: ${appsPage.showcase.enterpriseApps.length} references found`);
    console.log('   References:', appsPage.showcase.enterpriseApps.map((ref: any) => ref._ref));
  } else {
    console.log('❌ No enterprise apps referenced');
  }

  console.log('\n');

  // Check all available apps
  const allApps = await client.fetch(`*[_type == "app"]{
    _id,
    "name": name.en,
    slug,
    category,
    order
  } | order(order asc)`);

  console.log('📱 Available Apps in Sanity:');
  allApps.forEach((app: any) => {
    console.log(`   - ${app.name} (${app.category}) - ID: ${app._id}`);
  });

  console.log('\n');

  // Test the actual query used by the frontend
  const frontendQuery = `*[_type == "appsPage"][0] {
    showcase {
      "operatorApps": operatorApps[]-> {
        _id,
        "name": name.en,
        slug,
        category
      },
      "enterpriseApps": enterpriseApps[]-> {
        _id,
        "name": name.en,
        slug,
        category
      }
    }
  }`;

  const frontendData = await client.fetch(frontendQuery);
  
  console.log('🌐 Frontend Query Result:');
  console.log(JSON.stringify(frontendData, null, 2));
}

checkAppsPage()
  .then(() => {
    console.log('\n✅ Check completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Check failed:', error);
    process.exit(1);
  });

