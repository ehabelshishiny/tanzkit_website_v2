'use client';

import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { ScaleOnHover } from '@/components/animations/scale-on-hover';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, name: 'Facebook', url: '#' },
  { icon: Twitter, name: 'Twitter', url: '#' },
  { icon: Linkedin, name: 'LinkedIn', url: '#' },
  { icon: Instagram, name: 'Instagram', url: '#' }
];

export function SocialLinks() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      <ScrollReveal>
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
          <p className="text-muted-foreground mb-8">
            Stay connected with us on social media
          </p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <ScaleOnHover key={index}>
                <a
                  href={social.url}
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              </ScaleOnHover>
            ))}
          </div>
        </Card>
      </ScrollReveal>
    </section>
  );
}

