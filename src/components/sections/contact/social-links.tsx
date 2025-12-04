'use client';

import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { ScaleOnHover } from '@/components/animations/scale-on-hover';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';

const socialLinks = [
  { icon: Facebook, name: 'Facebook', url: '#' },
  { icon: Twitter, name: 'Twitter', url: '#' },
  { icon: Linkedin, name: 'LinkedIn', url: '#' },
  { icon: Instagram, name: 'Instagram', url: '#' }
];

export function SocialLinks() {
  const t = useTranslations('contact.social');

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      <ScrollReveal>
        <Card className="p-8 text-center">
          <Typography variant="h3" align="center" className="mb-4">
            {t('title')}
          </Typography>
          <Typography variant="body" align="center" className="text-muted-foreground mb-8">
            {t('subtitle')}
          </Typography>
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
