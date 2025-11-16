import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP Animation Utilities
 * Advanced timeline-based animations for complex sequences
 */

export const gsapUtils = {
  /**
   * Create a scroll-triggered animation
   */
  scrollTrigger: (element: string | Element, options: gsap.TweenVars & { trigger?: string | Element; scrollTrigger?: any }) => {
    const { trigger, scrollTrigger: scrollTriggerOptions, ...tweenOptions } = options;
    return gsap.to(element, {
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...(scrollTriggerOptions || {}),
      },
      ...tweenOptions,
    });
  },

  /**
   * Create a stagger animation with GSAP
   */
  staggerAnimation: (elements: string | Element[], options: gsap.TweenVars & { stagger?: number }) => {
    return gsap.from(elements, {
      opacity: 0,
      y: 50,
      stagger: options.stagger || 0.1,
      duration: 0.8,
      ease: 'power3.out',
      ...options,
    });
  },

  /**
   * Create a timeline for complex sequences
   */
  createTimeline: (options?: gsap.TimelineVars) => {
    return gsap.timeline(options);
  },

  /**
   * Parallax effect with GSAP
   */
  parallax: (element: string | Element, speed: number = 0.5) => {
    return gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  },

  /**
   * Text reveal animation
   */
  textReveal: (element: string | Element) => {
    return gsap.from(element, {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
      },
    });
  },

  /**
   * Counter animation
   */
  counter: (element: string | Element, endValue: number, duration: number = 2) => {
    const obj = { value: 0 };
    return gsap.to(obj, {
      value: endValue,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (typeof element === 'string') {
          const el = document.querySelector(element);
          if (el) el.textContent = Math.round(obj.value).toString();
        } else {
          element.textContent = Math.round(obj.value).toString();
        }
      },
    });
  },

  /**
   * Refresh ScrollTrigger (useful after dynamic content changes)
   */
  refresh: () => {
    ScrollTrigger.refresh();
  },

  /**
   * Kill all ScrollTriggers
   */
  killAll: () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  },
};

export { gsap, ScrollTrigger };

