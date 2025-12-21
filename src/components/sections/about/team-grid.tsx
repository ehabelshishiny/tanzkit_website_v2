'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Typography } from '@/components/ui/typography';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { ScrollReveal } from '@/components/animations/scroll-reveal';

interface TeamGridProps {
  data: {
    heading: string;
    subtitle: string;
    members: Array<{
      name: string;
      role: string;
      initials: string;
      bio: string;
    }>;
  };
}

export function TeamGrid({ data }: TeamGridProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 bg-muted/30">
      <ScrollReveal>
        <div className="text-center mb-12">
          <Typography variant="h2" align="center" className="mb-4">
            {data.heading}
          </Typography>
          <Typography variant="subtitle" align="center" className="text-muted-foreground max-w-2xl mx-auto">
            {data.subtitle}
          </Typography>
        </div>
      </ScrollReveal>

      <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.members.map((member, index) => (
          <StaggerItem key={index}>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow h-[355px] flex flex-col">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <Typography variant="h4" align="center" className="mb-1">
                {member.name}
              </Typography>
              <Typography variant="caption" align="center" className="text-primary font-medium mb-3">
                {member.role}
              </Typography>
              <Typography variant="body" align="center" className="text-sm text-muted-foreground">
                {member.bio}
              </Typography>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
