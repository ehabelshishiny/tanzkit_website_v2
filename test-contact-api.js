/**
 * Quick API Test Script
 * Run this to test the contact form API directly
 * 
 * Usage: node test-contact-api.js
 */

const testData = {
  name: "Test User",
  email: "test@example.com",
  company: "Test Company",
  phone: "+1 (555) 123-4567",
  inquiryType: "demo",
  companySize: "11-50",
  industry: "transportation",
  message: "This is a test message to verify the API is working correctly.",
  honeypot: "",
  mathAnswer: "10", // Adjust based on actual math question
  formLoadTime: 5000, // 5 seconds
};

async function testContactAPI() {
  console.log('🧪 Testing Contact Form API...\n');
  
  try {
    console.log('📤 Sending request to http://localhost:3000/api/contact');
    console.log('📝 Test data:', JSON.stringify(testData, null, 2));
    console.log('');
    
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    console.log('📥 Response Status:', response.status, response.statusText);
    
    const result = await response.json();
    console.log('📦 Response Body:', JSON.stringify(result, null, 2));
    
    if (response.ok) {
      console.log('\n✅ SUCCESS! API is working correctly.');
      console.log('📧 Check email at: m.elmahdy@codefyhub.com');
      console.log('💬 Check Slack channel: #tranzkit_website_leads');
    } else {
      console.log('\n❌ FAILED! API returned an error.');
      console.log('Error:', result.error);
      if (result.details) {
        console.log('Details:', result.details);
      }
    }
  } catch (error) {
    console.error('\n❌ ERROR! Failed to connect to API.');
    console.error('Error:', error.message);
    console.error('\nMake sure the dev server is running: npm run dev');
  }
}

// Run the test
testContactAPI();

