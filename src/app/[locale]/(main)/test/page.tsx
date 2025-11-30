'use client';

import { HeroSection } from '@/components/sections/homepage/hero-section';

export default function TestPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Use HeroSection but hide all text content with CSS */}
      <style jsx global>{`
        /* Hide all text content and buttons from hero section on test page */
        .test-page-hero section > div:not(:first-child) {
          display: none !important;
        }
        /* Keep only the canvas visible */
        .test-page-hero section > canvas {
          display: block !important;
        }
      `}</style>

      <div className="test-page-hero">
        <HeroSection />
      </div>

      {/* Clean canvas for component testing - add your components here */}
    </div>
  );
}

