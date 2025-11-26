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

const SECTION_HEIGHT = 1500;

export function AppsHeroSection() {
  return (
    <div className="bg-gray-100 dark:bg-muted/50">
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
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-background/0 to-background" />
    </div>
  );
};

// Helper function to get theme-aware image path
const getThemeImage = (theme: string | undefined, imageName: string): string => {
  const themeFolder = theme === 'dark' ? 'dark_theme' : 'light_theme';
  const prefix = theme === 'dark' ? 'dark' : 'light';
  return `/app_hero_section/${themeFolder}/${prefix}_${imageName}`;
};

const CenterImage = () => {
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ['75%', '100%']
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  // Use placeholder during SSR to avoid hydration mismatch
  const backgroundImage = mounted
    ? `url('${getThemeImage(theme, 'desktop_1.png')}')`
    : "url('/images/apps/hero-main-placeholder.jpg')";

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
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
        <div className="w-full sm:w-[35%] md:w-1/4 rounded-lg shadow-2xl aspect-[9/16] bg-muted" />
        <div className="mx-auto w-full md:w-2/3 lg:w-3/4 rounded-lg shadow-2xl aspect-[16/9] bg-muted" />
        <div className="ml-auto w-full sm:w-[35%] md:w-1/4 rounded-lg shadow-2xl aspect-[9/16] bg-muted" />
        <div className="ml-0 sm:ml-24 w-full sm:w-[35%] md:w-1/4 rounded-lg shadow-2xl mb-32 aspect-[9/16] bg-muted" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-[200px]">
      {/* Image 1: Mobile 1 - Driver app (portrait) */}
      <ParallaxImg
        src={getThemeImage(theme, 'mobile_1.png')}
        alt="Driver App Screenshot"
        start={-200}
        end={200}
        className="w-full sm:w-[35%] md:w-1/6 rounded-lg"
        aspectRatio="portrait"
      />

      {/* Image 2: Desktop 2 - Enterprise dashboard (landscape) */}
      <ParallaxImg
        src={getThemeImage(theme, 'desktop_2.png')}
        alt="Enterprise Dashboard Screenshot"
        start={-300}
        end={-250}
        className="mx-auto w-full md:w-2/3 lg:w-5/9 rounded-lg"
        aspectRatio="landscape"
        contain
      />

      {/* Image 3: Mobile 2 - Supervisor app (portrait) */}
      <ParallaxImg
        src={getThemeImage(theme, 'mobile_2.png')}
        alt="Supervisor App Screenshot"
        start={-400}
        end={0}
        className="ml-auto w-full sm:w-[35%] md:w-1/6 rounded-lg"
        aspectRatio="portrait"
      />

      {/* Image 4: Mobile 3 - Rider app (portrait) - Fades out WITH centered rectangle */}
      <ParallaxImg
        src={getThemeImage(theme, 'mobile_3.png')}
        alt="Rider App Screenshot"
        start={-150}
        end={-500}
        className="ml-0 sm:ml-24 w-full sm:w-[35%] md:w-1/6 rounded-lg mb-32"
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
