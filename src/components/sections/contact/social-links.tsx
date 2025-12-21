'use client';

import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { ScaleOnHover } from '@/components/animations/scale-on-hover';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface SocialLinksProps {
  data: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export function SocialLinks({ data }: SocialLinksProps) {
  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: data.facebook || '#' },
    { icon: Twitter, name: 'Twitter', url: data.twitter || '#' },
    { icon: Linkedin, name: 'LinkedIn', url: data.linkedin || '#' },
    { icon: Instagram, name: 'Instagram', url: data.instagram || '#' }
  ].filter(social => social.url !== '#'); // Only show links that are provided

  if (socialLinks.length === 0) {
    return null; // Don't render if no social links are provided
  }

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-16">
      <ScrollReveal>
        <Card className="p-8 text-center">
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <ScaleOnHover key={index}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
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
