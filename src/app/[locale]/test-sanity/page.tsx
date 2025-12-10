import { client } from '@/lib/sanity/client'

export default async function TestSanityPage() {
  try {
    // Test basic connection
    const datasets = await client.config().dataset
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-green-600">
            ✅ Sanity Connection Successful!
          </h1>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <h2 className="font-semibold text-lg mb-2">Project Configuration:</h2>
              <ul className="space-y-2 text-sm">
                <li><strong>Project ID:</strong> {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}</li>
                <li><strong>Dataset:</strong> {datasets}</li>
                <li><strong>API Version:</strong> {process.env.NEXT_PUBLIC_SANITY_API_VERSION}</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="font-semibold text-green-800">Phase 1 Complete! ✨</p>
              <p className="text-green-700 text-sm mt-1">
                Your Sanity CMS is configured and ready. You can now move to Phase 2: Schema Design.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-semibold mb-2">What's Next?</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>Phase 2: Create content schemas</li>
                <li>Phase 2: Deploy Sanity Studio</li>
                <li>Phase 2: Add bilingual support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="min-h-screen bg-red-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-red-600">
            ❌ Connection Error
          </h1>
          <pre className="bg-red-100 p-4 rounded overflow-auto text-red-800 text-sm">
            {error instanceof Error ? error.message : JSON.stringify(error, null, 2)}
          </pre>
          <div className="mt-4 text-sm text-gray-700">
            <p className="font-semibold">Troubleshooting:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Check your .env.local file exists</li>
              <li>Verify NEXT_PUBLIC_SANITY_PROJECT_ID = 1dovcqcz</li>
              <li>Verify NEXT_PUBLIC_SANITY_DATASET = production</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
