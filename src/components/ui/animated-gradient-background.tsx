'use client';

import { cn } from '@/lib/utils';

interface AnimatedGradientBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'vibrant' | 'subtle';
}

export function AnimatedGradientBackground({
  children,
  className,
  variant = 'default',
}: AnimatedGradientBackgroundProps) {
  const gradientVariants = {
    default: 'from-blue-500/20 via-purple-500/20 to-pink-500/20',
    vibrant: 'from-cyan-500/30 via-blue-500/30 to-purple-500/30',
    subtle: 'from-slate-500/10 via-gray-500/10 to-zinc-500/10',
  };

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      {/* Animated gradient background */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br animate-gradient-shift',
          gradientVariants[variant]
        )}
        style={{
          backgroundSize: '200% 200%',
        }}
      />
      
      {/* Floating orbs for depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-slower"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

