'use client';

import { ReactLenis } from 'lenis/react';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

const SECTION_HEIGHT = 1500;

export function AppsHeroSection() {
  const t = useTranslations('apps.main.hero');

  return (
    <div className="bg-background">
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Hero t={t} />
      </ReactLenis>
    </div>
  );
}

const Hero = ({ t }: { t: any }) => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage t={t} />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-background/0 to-background" />
    </div>
  );
};

const CenterImage = ({ t }: { t: any }) => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ['170%', '100%']
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full flex items-center justify-center"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        // PLACEHOLDER: Replace with your main hero image (landscape - operator or enterprise dashboard)
        backgroundImage:
          "url('/images/apps/hero-main-placeholder.jpg')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Text Overlay */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-[200px]">
      {/* First Row: Portrait mobile app on left */}
      <ParallaxImg
        src="/images/apps/driver-app-placeholder.jpg" // PLACEHOLDER: Driver App (portrait)
        alt="Driver App Screenshot"
        start={-200}
        end={200}
        className="w-full sm:w-1/2 md:w-1/3 rounded-lg shadow-2xl"
        aspectRatio="portrait"
      />

      {/* Second Row: Landscape dashboard (centered, larger) */}
      <ParallaxImg
        src="/images/apps/operator-dashboard-placeholder.jpg" // PLACEHOLDER: Operator Dashboard (landscape)
        alt="Operator Dashboard Screenshot"
        start={200}
        end={-250}
        className="mx-auto w-full md:w-2/3 lg:w-3/4 rounded-lg shadow-2xl"
        aspectRatio="landscape"
      />

      {/* Third Row: Portrait mobile app on right */}
      <ParallaxImg
        src="/images/apps/supervisor-app-placeholder.jpg" // PLACEHOLDER: Supervisor App (portrait)
        alt="Supervisor App Screenshot"
        start={-200}
        end={200}
        className="ml-auto w-full sm:w-1/2 md:w-1/3 rounded-lg shadow-2xl"
        aspectRatio="portrait"
      />

      {/* Fourth Row: Portrait mobile app on left (offset) */}
      <ParallaxImg
        src="/images/apps/rider-app-placeholder.jpg" // PLACEHOLDER: Rider App (portrait)
        alt="Rider App Screenshot"
        start={0}
        end={-500}
        className="ml-0 sm:ml-24 w-full sm:w-5/12 md:w-1/3 rounded-lg shadow-2xl"
        aspectRatio="portrait"
      />

      {/* Fifth Row: Landscape dashboard */}
      <ParallaxImg
        src="/images/apps/enterprise-dashboard-placeholder.jpg" // PLACEHOLDER: Enterprise Dashboard (landscape)
        alt="Enterprise Dashboard Screenshot"
        start={-150}
        end={150}
        className="mx-auto w-full md:w-2/3 lg:w-3/4 rounded-lg shadow-2xl mb-32"
        aspectRatio="landscape"
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
}: {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
  aspectRatio: 'portrait' | 'landscape';
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
      } object-cover`}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};
