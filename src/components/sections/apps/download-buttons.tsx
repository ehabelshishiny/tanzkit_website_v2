'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { ScaleOnHover } from '@/components/animations/scale-on-hover';
import { Apple, Smartphone, QrCode } from 'lucide-react';

export function DownloadButtons() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      <ScrollReveal>
        <Card className="p-12 text-center bg-gradient-to-br from-primary/5 to-background">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Download Tranzkit now and experience seamless transportation
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <ScaleOnHover>
              <Button size="lg" className="gap-2 min-w-[200px]">
                <Apple className="w-5 h-5" />
                Download for iOS
              </Button>
            </ScaleOnHover>
            <ScaleOnHover>
              <Button size="lg" variant="outline" className="gap-2 min-w-[200px]">
                <Smartphone className="w-5 h-5" />
                Download for Android
              </Button>
            </ScaleOnHover>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <QrCode className="w-16 h-16" />
            <div className="text-left">
              <div className="font-medium">Scan to Download</div>
              <div>Works with both iOS and Android</div>
            </div>
          </div>
        </Card>
      </ScrollReveal>
    </section>
  );
}

