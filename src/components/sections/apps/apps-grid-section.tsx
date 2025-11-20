'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { appsArray } from '@/config/apps';
import { AppCard } from '@/components/ui/app-card';
import { SectionContainer } from '@/components/ui/section-container';
import { fadeInUp } from '@/lib/animation-variants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export function AppsGridSection() {
  const t = useTranslations('apps.main.showcase');

  return (
    <SectionContainer
      id="apps-showcase"
      background="default"
      padding="xl"
      maxWidth="2xl"
    >
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
          {t('title')}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </motion.div>

      {/* Apps Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {appsArray.map((app) => (
          <motion.div key={app.id} variants={fadeInUp}>
            <AppCard
              id={app.id}
              name={app.name}
              tagline={app.tagline}
              description={app.description}
              icon={app.icon}
              gradient={app.gradient}
              accentColor={app.accentColor}
              use3D={app.use3DCard}
            />
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}

