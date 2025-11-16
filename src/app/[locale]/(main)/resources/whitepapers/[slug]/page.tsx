import { Card } from '@/components/ui/card';

export default function WhitepaperPage({ params }: { params: { slug: string } }) {
  return (
    <main className="container py-12">
      <Card className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Whitepaper: {params.slug}</h1>
        <p className="text-muted-foreground mb-8">Published on March 10, 2024</p>
        <div className="prose prose-lg max-w-none">
          <p>This is a placeholder for the whitepaper content. MDX integration will be added in Phase 2.</p>
        </div>
      </Card>
    </main>
  );
}

