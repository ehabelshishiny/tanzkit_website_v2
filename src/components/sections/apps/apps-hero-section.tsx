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
import { useTranslations, useLocale } from 'next-intl';
import { Typography } from '@/components/ui/typography';

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


const TextHero = () => {
  const { scrollY } = useScroll();
  const t = useTranslations('apps.main.parallaxHero');
  
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
          <Typography variant="display" className="mb-6">
            <span className="text-blue-600 dark:text-blue-400">{t('title.intelligent')} </span>
            <span className="text-emerald-600 dark:text-emerald-400">{t('title.application')} </span>
            <span className="text-foreground">{t('title.ecosystem')}</span>
          </Typography>

          <Typography variant="subtitle" className="text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t('subtitle')}
          </Typography>
        </motion.div>
      </motion.div>
    </div>
  );
};
const ParallaxImages = () => {
  const { theme } = useTheme();
  const locale = useLocale();
  const t = useTranslations('apps.main.parallaxHero.imageAlts');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 pt-[200px]" dir="ltr">
        <div className="mx-auto w-full md:w-1/2 lg:w-1/2 rounded-lg shadow-2xl aspect-[16/9] bg-muted" />
        <div className="w-full sm:w-[35%] md:w-1/4 rounded-lg shadow-2xl aspect-[9/16] bg-muted" />
        <div className="mx-auto w-full md:w-2/3 lg:w-3/4 rounded-lg shadow-2xl aspect-[16/9] bg-muted" />
        <div className="ml-auto w-full sm:w-[35%] md:w-1/4 rounded-lg shadow-2xl aspect-[9/16] bg-muted" />
        <div className="ml-0 sm:ml-24 w-full sm:w-[35%] md:w-1/4 rounded-lg shadow-2xl mb-32 aspect-[9/16] bg-muted" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-[200px]" dir="ltr">
      <ParallaxImg
        src={'/app_hero_section/operators_dashboard.png'}
        alt={t('operatorsDashboard')}
        start={-100}
        end={100}
        className="ml-auto mr-16 w-full md:w-1/2 lg:w-4/7 rounded-lg"
        aspectRatio="landscape"
        contain
      />

      <ParallaxImg
        src={'/app_hero_section/driver.png'}
        alt={t('driverApp')}
        start={-250}
        end={150}
        className="w-full sm:w-[35%] md:w-3/14 rounded-lg"
        aspectRatio="portrait"
        contain
      />

      <ParallaxImg
        src={'/app_hero_section/enterprise_dashboard.png'}
        alt={t('enterpriseDashboard')}
        start={-400}
        end={-300}
        className="mx-auto w-full md:w-2/3 lg:w-7/10 rounded-lg"
        aspectRatio="landscape"
        contain
      />

      <ParallaxImg
        src={'/app_hero_section/supervisor.png'}
        alt={t('supervisorApp')}
        start={-650}
        end={-50}
        className="ml-auto w-full sm:w-[35%] md:w-3/14 rounded-lg"
        aspectRatio="portrait"
        contain
      />

      <ParallaxImg
        src={'/app_hero_section/rider.png'}
        alt={t('riderApp')}
        start={-1000}
        end={-550}
        className="ml-0 sm:ml-48 w-full sm:w-[35%] md:w-3/14 rounded-lg mb-32"
        aspectRatio="portrait"
        contain
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
