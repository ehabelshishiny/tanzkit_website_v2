'use client';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { ScrollReveal } from '@/components/animations/scroll-reveal';

const team = [
  {
    name: 'Ahmed Hassan',
    role: 'CEO & Founder',
    initials: 'AH',
    bio: 'Visionary leader with 15+ years in transportation technology'
  },
  {
    name: 'Sarah Mitchell',
    role: 'CTO',
    initials: 'SM',
    bio: 'Tech innovator specializing in AI and machine learning'
  },
  {
    name: 'Omar Al-Rashid',
    role: 'COO',
    initials: 'OA',
    bio: 'Operations expert with global fleet management experience'
  },
  {
    name: 'Lisa Chen',
    role: 'Head of Product',
    initials: 'LC',
    bio: 'Product strategist focused on user-centric design'
  },
  {
    name: 'Mohammed Ali',
    role: 'Head of Engineering',
    initials: 'MA',
    bio: 'Engineering leader building scalable transportation systems'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Customer Success',
    initials: 'ER',
    bio: 'Customer advocate ensuring exceptional service delivery'
  }
];

export function TeamGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 bg-muted/30">
      <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The passionate people behind Tranzkit's success
          </p>
        </div>
      </ScrollReveal>

      <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member, index) => (
          <StaggerItem key={index}>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
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

