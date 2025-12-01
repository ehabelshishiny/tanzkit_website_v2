'use client';

import { ReactLenis } from 'lenis/react';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const SECTION_HEIGHT = 1800;

export function AppsHeroSection() {
  return (
    <div className="hidden lg:block bg-gray-100 dark:bg-muted/50">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Hero />
      </ReactLenis>
    </div>
  );
}

const Hero = () => {
  const { scrollY } = useScroll();
  
  // Fade out effect for the entire hero section at the end
  const heroOpacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      style={{ 
        height: `calc(${SECTION_HEIGHT}px + 100vh)`,
        opacity: heroOpacity
      }}
      className="relative w-full"
    >
      <TextHero />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-background/0 to-background" />
    </motion.div>
  );
};

// Helper function to get theme-aware image path
const getThemeImage = (theme: string | undefined, imageName: string): string => {
  const themeFolder = theme === 'dark' ? 'dark_theme' : 'light_theme';
  const prefix = theme === 'dark' ? 'dark' : 'light';
  return `/app_hero_section/${themeFolder}/${prefix}_${imageName}`;
};

// New Text Hero Component
const TextHero = () => {
  const { scrollY } = useScroll();
  
  // Blur effect when scrolling starts - from 0px to 300px scroll
  const blur = useTransform(scrollY, [0, 4500], [0, 12]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <div className="sticky top-16 h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-gray-100 dark:bg-muted/50">
      <motion.div 
        className="max-w-4xl px-6 text-center"
        style={{ filter }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-blue-600 dark:text-blue-400">Intelligent </span>
            <span className="text-emerald-600 dark:text-emerald-400">Application </span>
            <span className="text-foreground">Ecosystem</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Discover our comprehensive suite of mobile and web applications designed to revolutionize workforce mobility across every role
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const ParallaxImages = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show placeholder during initial render to avoid hydration issues
  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 pt-[200px]">
        {/* Render empty placeholders during SSR */}
        <div className="mx-auto w-full md:w-1/2 lg:w-1/2 rounded-lg shadow-2xl aspect-[16/9] bg-muted" />
        <div className="w-full sm:w-[35%] md:w-1/4 rounded-lg shadow-2xl aspect-[9/16] bg-muted" />
        <div className="mx-auto w-full md:w-2/3 lg:w-3/4 rounded-lg shadow-2xl aspect-[16/9] bg-muted" />
        <div className="ml-auto w-full sm:w-[35%] md:w-1/4 rounded-lg shadow-2xl aspect-[9/16] bg-muted" />
        <div className="ml-0 sm:ml-24 w-full sm:w-[35%] md:w-1/4 rounded-lg shadow-2xl mb-32 aspect-[9/16] bg-muted" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-[200px]">
      {/* Image 1: Desktop 1 - NOW CENTERED AT 50% WIDTH (landscape) */}
      <ParallaxImg
        src={getThemeImage(theme, 'desktop_1.png')}
        alt="Operators Dashboard Screenshot"
        start={-100}
        end={100}
        className="ml-auto mr-16 w-full md:w-1/2 lg:w-1/2 rounded-lg"
        aspectRatio="landscape"
        contain
      />

      {/* Image 2: Mobile 1 - Driver app (portrait) */}
      <ParallaxImg
        src={getThemeImage(theme, 'mobile_1.png')}
        alt="Driver App Screenshot"
        start={-250}
        end={150}
        className="w-full sm:w-[35%] md:w-2/9 rounded-lg"
        aspectRatio="portrait"
      />

      {/* Image 3: Desktop 2 - Enterprise dashboard (landscape) */}
      <ParallaxImg
        src={getThemeImage(theme, 'desktop_2.png')}
        alt="Enterprise Dashboard Screenshot"
        start={-400}
        end={-300}
        className="mx-auto w-full md:w-2/3 lg:w-6/9 rounded-lg"
        aspectRatio="landscape"
        contain
      />

      {/* Image 4: Mobile 2 - Supervisor app (portrait) */}
      <ParallaxImg
        src={getThemeImage(theme, 'mobile_2.png')}
        alt="Supervisor App Screenshot"
        start={-650}
        end={-50}
        className="ml-auto w-full sm:w-[35%] md:w-2/9 rounded-lg"
        aspectRatio="portrait"
      />

      {/* Image 5: Mobile 3 - Rider app (portrait) */}
      <ParallaxImg
        src={getThemeImage(theme, 'mobile_3.png')}
        alt="Rider App Screenshot"
        start={-850}
        end={-550}
        className="ml-0 sm:ml-48 w-full sm:w-[35%] md:w-2/9 rounded-lg mb-32"
        aspectRatio="portrait"
      />
    </div>
  );
};

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end,
  aspectRatio,
  contain = false,
}: {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
  aspectRatio: 'portrait' | 'landscape';
  contain?: boolean;
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`${className} ${
        aspectRatio === 'portrait' ? 'aspect-[9/16]' : 'aspect-[16/9]'
      } ${contain ? 'object-contain' : 'object-cover'}`}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};
