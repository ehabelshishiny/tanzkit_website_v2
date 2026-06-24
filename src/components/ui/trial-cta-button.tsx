'use client';

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { localizeInternalHref } from '@/lib/localize-internal-href';

interface TrialCTAButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: ReactNode;
  customText?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  openInNewTab?: boolean;
}

const sizeVariants = {
  sm: 'h-8 px-4 py-2 text-sm',
  md: 'h-9 px-6 py-2.5 text-sm',
  lg: 'h-10 px-8 py-4 text-base',
};

const variantStyles = {
  primary:
    'bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold shadow-lg hover:shadow-2xl hover:shadow-accent/50',
  secondary:
    'bg-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg',
  tertiary:
    'border bg-background text-foreground font-medium shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
};

export function TrialCTAButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  customText,
  icon,
  iconPosition = 'right',
  disabled = false,
  fullWidth = false,
  href,
  openInNewTab = false,
}: TrialCTAButtonProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('common');
  const { theme } = useTheme();
  const isRTL = locale === 'ar';

  const handleClick = () => {
    if (!disabled && typeof window !== 'undefined') {
      if (href) {
        const localizedHref = localizeInternalHref(href, locale);

        if (openInNewTab) {
          window.open(localizedHref, '_blank', 'noopener,noreferrer');
          return;
        }

        if (localizedHref.startsWith('/')) {
          router.push(localizedHref);
          return;
        }

        window.location.href = localizedHref;
        return;
      }

      // Get current theme, default to 'light' if not set
      const currentTheme = theme || 'light';

      // Build signup URL with theme and language parameters
      const signupUrl = `https://app.tranzkit.com/signup?theme=${currentTheme}&lang=${locale}`;

      // Redirect to signup page on the same tab
      window.location.href = signupUrl;
    }
  };

  const buttonText = customText || children || t('startFreeTrial');

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={isRTL ? 'ml-2' : 'mr-2'}>{icon}</span>
      )}
      <span className="relative z-10 transition-all duration-300">
        {buttonText}
      </span>
      {icon && iconPosition === 'right' && (
        <span className={isRTL ? 'mr-2' : 'ml-2'}>{icon}</span>
      )}
    </>
  );

  const buttonClasses = cn(
    'group relative inline-flex items-center justify-center',
    'rounded-lg overflow-hidden',
    'transition-all duration-500',
    'whitespace-nowrap',
    'cursor-pointer',
    sizeVariants[size],
    variantStyles[variant],
    disabled && 'opacity-50 cursor-not-allowed',
    fullWidth && 'w-full',
    className,
  );

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={buttonClasses}
    >
      {/* Hover gradient overlay for primary variant */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-accent/80 to-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">
        {buttonContent}
      </span>
    </motion.button>
  );
}
