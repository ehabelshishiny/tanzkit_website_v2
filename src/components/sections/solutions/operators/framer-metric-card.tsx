'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Typography } from '@/components/ui/typography';
import { LucideIcon } from 'lucide-react';

interface FramerMetricCardProps {
  value: number | string;
  suffix?: string;
  prefix?: string;
  label: string;
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'accent' | 'success';
  delay?: number;
}

const variantClasses = {
  primary: 'from-primary to-primary/80',
  secondary: 'from-secondary to-secondary/80',
  accent: 'from-accent to-accent/80',
  success: 'from-success to-success/80',
};

export function FramerMetricCard({
  value,
  suffix = '',
  prefix = '',
  label,
  icon: Icon,
  variant = 'primary',
  delay = 0,
}: FramerMetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  // Number counter animation
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0.2 });
  const displayValue = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isInView && typeof value === 'number') {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (displayValue.current) {
        displayValue.current.textContent = Math.ceil(latest).toString();
      }
    });
    return () => unsubscribe();
  }, [springValue]);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // Card entrance animation
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        delay,
      },
    },
  };

  // Icon floating animation
  const iconVariants = {
    initial: { y: 0 },
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={{ scale: 1.05, z: 50 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative rounded-2xl p-4 md:p-5 text-center overflow-hidden cursor-pointer bg-gradient-to-br ${variantClasses[variant]} shadow-2xl`}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10"
        animate={{
          backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: '-100%', skewX: -20 }}
        animate={isHovered ? { x: '200%' } : { x: '-100%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Icon with floating animation */}
      <motion.div variants={iconVariants} initial="initial" animate="animate">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground dark:text-gray-100 mx-auto mb-3 drop-shadow-lg" />
      </motion.div>

      {/* Number with counter animation */}
      <Typography variant="h2" as="div" className="text-primary-foreground dark:text-gray-100 mb-2 drop-shadow-lg">
        {prefix}
        {typeof value === 'number' ? (
          <span ref={displayValue}>0</span>
        ) : (
          <span>{value}</span>
        )}
        {suffix}
      </Typography>

      {/* Label */}
      <Typography variant="caption" as="p" className="text-primary-foreground dark:text-gray-100 font-medium opacity-95">
        {label}
      </Typography>
    </motion.div>
  );
}
