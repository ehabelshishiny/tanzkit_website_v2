import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: 'light' | 'dark' | 'gradient' | 'transparent';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  id?: string;
}

const backgroundVariants = {
  light: 'bg-background',
  dark: 'bg-card',
  gradient: 'bg-gradient-to-b from-muted/30 to-background',
  transparent: 'bg-transparent',
};

const paddingVariants = {
  none: '',
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-20',
  xl: 'py-20 md:py-24',
};

const maxWidthVariants = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

export function SectionContainer({
  children,
  className,
  background = 'transparent',
  padding = 'lg',
  maxWidth = 'xl',
  id,
}: SectionContainerProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-full',
        backgroundVariants[background],
        paddingVariants[padding],
        className
      )}
    >
      <div className={cn('container mx-auto px-4 md:px-6', maxWidthVariants[maxWidth])}>
        {children}
      </div>
    </section>
  );
}

