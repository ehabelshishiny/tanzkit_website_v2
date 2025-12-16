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

  // Check if mobile viewport
  const isMobile = window.innerWidth < 768;

  // Initialize Lenis smooth scrolling for both LTR and RTL
  // RTL mobile uses locked vertical orientation to prevent horizontal scroll conflicts
  const lenis = new Lenis({
    duration: rtl ? 1.0 : 1.2, // Slightly faster for RTL
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: rtl ? 0.8 : 1, // Slightly reduced for RTL stability
    touchMultiplier: rtl && isMobile ? 1.5 : 2, // Reduced multiplier for RTL mobile
    infinite: false,
    // Explicitly prevent horizontal scroll on RTL mobile
    ...(rtl && isMobile && {
      prevent: (node) => {
        // Prevent Lenis from handling horizontal scroll events
        return node.hasAttribute('data-lenis-prevent-horizontal');
      },
    }),
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
