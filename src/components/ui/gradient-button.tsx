'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { localizeInternalHref } from '@/lib/localize-internal-href';

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  gradient?: string;
  hoverGradient?: string;
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
}

const sizeVariants = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const variantStyles = {
  primary:
    'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl',
  secondary:
    'bg-gradient-to-r from-secondary to-muted text-secondary-foreground shadow-md hover:shadow-lg',
  outline: 'border-2 border-primary text-primary hover:bg-primary/10',
};

export function GradientButton({
  children,
  variant = 'primary',
  size = 'md',
  gradient,
  hoverGradient,
  onClick,
  href,
  icon,
  iconPosition = 'right',
  className,
  disabled = false,
}: GradientButtonProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const localizedHref = href ? localizeInternalHref(href, locale) : undefined;

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && (
        <span className={isRTL ? 'ml-2' : 'mr-2'}>{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={isRTL ? 'mr-2' : 'ml-2'}>{icon}</span>
      )}
    </>
  );

  const buttonClasses = cn(
    'relative inline-flex items-center justify-center',
    'font-semibold rounded-full',
    'transition-all duration-300',
    'overflow-hidden',
    sizeVariants[size],
    variantStyles[variant],
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  );

  const buttonStyle = gradient
    ? { backgroundImage: `linear-gradient(to right, ${gradient})` }
    : {};

  if (localizedHref && !disabled) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block"
      >
        <Link
          href={localizedHref}
          className={buttonClasses}
          style={buttonStyle}
        >
          {hoverGradient && (
            <motion.span
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{
                backgroundImage: `linear-gradient(to right, ${hoverGradient})`,
              }}
            />
          )}
          <span className="relative z-10 flex items-center">
            {buttonContent}
          </span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={buttonClasses}
      style={buttonStyle}
    >
      {hoverGradient && (
        <motion.span
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            backgroundImage: `linear-gradient(to right, ${hoverGradient})`,
          }}
        />
      )}
      <span className="relative z-10 flex items-center">{buttonContent}</span>
    </motion.button>
  );
}
