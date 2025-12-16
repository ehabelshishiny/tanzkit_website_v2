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

  // Initialize Lenis smooth scrolling for both LTR and RTL
  // RTL uses slightly adjusted settings for better compatibility
  const lenis = new Lenis({
    duration: rtl ? 1.0 : 1.2, // Slightly faster for RTL
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: rtl ? 0.8 : 1, // Slightly reduced for RTL stability
    touchMultiplier: 2,
    infinite: false,
  });

  // Request animation frame loop
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  console.log(`Lenis smooth scroll enabled for ${rtl ? 'RTL' : 'LTR'} mode`);

  // Cleanup on unmount
  return () => {
    lenis.destroy();
  };
}, []);

  return <>{children}</>;
}
