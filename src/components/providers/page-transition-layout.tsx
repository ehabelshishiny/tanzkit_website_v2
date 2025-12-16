'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionLayoutProps {
  children: ReactNode;
}

export function PageTransitionLayout({ children }: PageTransitionLayoutProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isNavigating, setIsNavigating] = useState(false);

  // Smart scroll restoration - scroll to top on page change
  useEffect(() => {
    setIsNavigating(true);
    
    // Fix for RTL: Use scrollTo with left: 0 to prevent horizontal scroll
    const isRTL = document.documentElement.dir === 'rtl';
    
    if (isRTL) {
      // For RTL: Reset both vertical and horizontal scroll
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      // Force re-flow to prevent scroll artifacts
      document.documentElement.scrollLeft = 0;
    } else {
      // For LTR: Normal scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    
    // Reset navigation state after transition
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Respect user's motion preferences (accessibility)
  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  // Smart animation variants based on navigation pattern
 const getAnimationVariant = () => {
  // Check if RTL to adjust animations (SSR-safe)
  const isRTL = typeof document !== 'undefined' && document.documentElement.dir === 'rtl';
  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Enhanced modern animation with multiple layers
  // For RTL mobile: Disable Y-axis and scale transforms to prevent scroll conflicts
  return {
    initial: {
      opacity: 0,
      scale: (isRTL && isMobile) ? 1 : 0.98,
      y: (isRTL && isMobile) ? 0 : (isRTL ? 0 : 24),
      filter: 'blur(8px)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
    },
    exit: {
      opacity: 0,
      scale: (isRTL && isMobile) ? 1 : 0.98,
      y: (isRTL && isMobile) ? 0 : (isRTL ? 0 : -24),
      filter: 'blur(8px)',
    },
  };
};


  const variant = getAnimationVariant();

  return (
    <>
      {/* Loading indicator overlay - shows during navigation */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Top progress bar with Tranzkit brand colors */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-navy via-brand-ocean via-brand-emerald to-brand-lime"
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: 1, transformOrigin: 'left' }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1], // Custom bezier for smooth acceleration
              }}
            />
            
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px]" />

            {/* Central Modern Loader */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Outer rotating ring - Brand gradient */}
                <motion.div
                  className="w-16 h-16 rounded-full border-4 border-transparent bg-gradient-to-r from-brand-navy via-brand-ocean via-brand-emerald to-brand-lime"
                  style={{
                    backgroundClip: 'padding-box',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Inner pulsing circle */}
                <motion.div
                  className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-gradient-to-br from-brand-ocean to-brand-emerald"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Center dot */}
                <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-background" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main page transition */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={variant.initial}
          animate={variant.animate}
          exit={variant.exit}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1], // Custom easing for modern feel
            opacity: { duration: 0.4 },
            scale: { duration: 0.5 },
            y: { duration: 0.5 },
            filter: { duration: 0.3 },
          }}
          // GPU acceleration for smooth performance
          style={{
            willChange: 'transform, opacity, filter',
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
