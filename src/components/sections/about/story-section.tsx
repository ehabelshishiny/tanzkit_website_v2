'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/scroll-reveal';

export function StorySection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Story
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From a simple idea to a global transportation platform
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-8">
        <ScrollReveal delay={0.2}>
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To revolutionize urban transportation by providing intelligent, efficient, and sustainable 
              mobility solutions that connect people, businesses, and communities. We believe in making 
              transportation accessible, reliable, and environmentally responsible.
            </p>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To become the world's most trusted transportation platform, empowering millions of people 
              with seamless mobility solutions. We envision a future where transportation is smart, 
              sustainable, and serves the needs of every community.
            </p>
          </Card>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.4}>
        <Card className="p-8 mt-8">
          <h3 className="text-2xl font-bold mb-4">Our Values</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Innovation</h4>
              <p className="text-sm text-muted-foreground">
                Constantly pushing boundaries with cutting-edge technology
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Reliability</h4>
              <p className="text-sm text-muted-foreground">
                Building trust through consistent, dependable service
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Sustainability</h4>
              <p className="text-sm text-muted-foreground">
                Committed to reducing environmental impact
              </p>
            </div>
          </div>
        </Card>
      </ScrollReveal>
    </section>
  );
}

