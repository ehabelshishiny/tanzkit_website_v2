'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { useTranslations } from 'next-intl';

export function TeamGrid() {
  const t = useTranslations('about.team');

  // Get team members as an array
  const team = Array.from({ length: 6 }, (_, i) => ({
    name: t(`members.${i}.name`),
    role: t(`members.${i}.role`),
    initials: t(`members.${i}.initials`),
    bio: t(`members.${i}.bio`)
  }));

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 bg-muted/30">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('heading')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </ScrollReveal>

      <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, index) => (
          <StaggerItem key={index}>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow h-[340px] flex flex-col">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <div className="text-sm text-primary font-medium mb-3">{member.role}</div>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
