'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Typography } from '@/components/ui/typography';
import { LucideIcon } from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GsapImpactTileProps {
  value: number | string;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'accent' | 'success';
  delay?: number;
}

const variantClasses = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  success: 'bg-success',
};

export function GsapImpactTile({
  value,
  suffix = '',
  prefix = '',
  label,
  icon: Icon,
  variant = 'primary',
  delay = 0,
}: GsapImpactTileProps) {
  const tileRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!tileRef.current || !numberRef.current || !iconRef.current || !labelRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: tileRef.current,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none none',
        },
        delay,
      });

      // Card entrance with 3D rotation
      tl.from(tileRef.current, {
        opacity: 0,
        rotateX: -15,
        rotateY: 15,
        scale: 0.8,
        duration: 1,
        ease: 'power3.out',
      });

      // Icon animation with bounce
      tl.from(
        iconRef.current,
        {
          scale: 0,
          rotation: -180,
          duration: 0.8,
          ease: 'back.out(1.7)',
        },
        '-=0.6'
      );

      // Number counter animation
      if (typeof value === 'number') {
        tl.from(
          { val: 0 },
          {
            val: value,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function () {
              if (numberRef.current) {
                const span = numberRef.current.querySelector('span');
                if (span) {
                  span.textContent = Math.ceil(this.targets()[0].val).toString();
                }
              }
            },
          },
          '-=0.5'
        );
      } else {
        tl.from(
          numberRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.5'
        );
      }

      // Label fade in
      tl.from(
        labelRef.current,
        {
          opacity: 0,
          y: 10,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      // Hover animation
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(tileRef.current, {
        scale: 1.05,
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        duration: 0.3,
        ease: 'power2.out',
      });

      const currentTile = tileRef.current;
      if (currentTile) {
        currentTile.addEventListener('mouseenter', () => hoverTl.play());
        currentTile.addEventListener('mouseleave', () => hoverTl.reverse());
      }
    }, tileRef);

    return () => ctx.revert();
  }, [value, delay]);

  return (
    <div
      ref={tileRef}
      className={`relative rounded-2xl p-8 md:p-10 text-center overflow-hidden cursor-default ${variantClasses[variant]}`}
      style={{ perspective: '1000px' }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon */}
      <div ref={iconRef}>
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground mx-auto mb-4" />
      </div>

      {/* Number */}
      <div ref={numberRef}>
        <Typography variant="display" as="div" className="text-primary-foreground mb-4">
          {prefix}
          <span>{typeof value === 'number' ? '0' : value}</span>
          {suffix}
        </Typography>
      </div>

      {/* Label */}
      <div ref={labelRef}>
        <Typography variant="subtitle" as="p" className="text-primary-foreground opacity-90">
          {label}
        </Typography>
      </div>
    </div>
  );
}
