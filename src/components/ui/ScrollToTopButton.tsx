'use client';


import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';


/**
 * ScrollToTopButton Component
 * 
 * A floating button that appears when user scrolls down 400px.
 * Features:
 * - Smooth scroll to top animation
 * - Fixed on right side (both LTR and RTL)
 * - Light/Dark theme compatible
 * - Fade in/out transition
 * - Mobile responsive
 * - Brand gradient background
 */
export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    // Throttle scroll event for performance
    let timeoutId: NodeJS.Timeout;
    
    const toggleVisibility = () => {
      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }


      // Debounce scroll event (50ms)
      timeoutId = setTimeout(() => {
        if (window.scrollY > 400) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }, 50);
    };


    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', toggleVisibility, { passive: true });


    // Cleanup
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50 
        flex h-10 w-10 items-center justify-center
        rounded-full
        bg-gradient-to-br from-brand-ocean via-brand-emerald to-brand-lime
        text-white
        shadow-lg hover:shadow-xl
        transition-all duration-300 ease-in-out
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        group
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}
        
        /* Desktop responsive */
        md:bottom-8 md:right-8
      `}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ArrowUp 
        className="h-4 w-4 md:h-4.5 md:w-4.5 transition-transform duration-300 group-hover:-translate-y-1" 
        strokeWidth={2.5}
      />
    </button>
  );
}
