'use client';

import { ReactNode, useEffect, useState } from 'react';
import Lenis from 'lenis';

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Check if document is RTL
    const rtl = document.documentElement.dir === 'rtl';
    setIsRTL(rtl);

    // Skip Lenis initialization for RTL languages to avoid scroll conflicts
    if (rtl) {
      console.log('Lenis disabled for RTL mode - using native scroll');
      return;
    }

    // Initialize Lenis smooth scrolling only for LTR
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Request animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
