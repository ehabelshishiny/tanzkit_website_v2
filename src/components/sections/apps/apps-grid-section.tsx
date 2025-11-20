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

  // Separate apps by type
  const desktopApps = appsArray.filter((app) => app.appType === 'desktop');
  const mobileApps = appsArray.filter((app) => app.appType === 'mobile');

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

      {/* Apps Grid - Desktop/Mobile Layout */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="space-y-4"
      >
        {/* Top Row: Desktop Apps (2 cards side-by-side) */}
        {/* Compact layout with reduced margins and gaps */}
        <motion.div
          variants={fadeInUp}
          className="w-full"
        >
          <div className="hidden lg:flex w-full gap-4">
            {/* First desktop app: 50% */}
            {desktopApps[0] && (
              <motion.div variants={fadeInUp} className="w-1/2">
                <AppCard
                  id={desktopApps[0].id}
                  name={desktopApps[0].name}
                  tagline={desktopApps[0].tagline}
                  description={desktopApps[0].description}
                  iconName={desktopApps[0].icon}
                  image={desktopApps[0].image}
                  appType={desktopApps[0].appType}
                  gradient={desktopApps[0].gradient}
                  accentColor={desktopApps[0].accentColor}
                  use3DVariant={desktopApps[0].use3DVariant}
                  use3D={desktopApps[0].use3DCard}
                />
              </motion.div>
            )}

            {/* Second desktop app: 50% */}
            {desktopApps[1] && (
              <motion.div variants={fadeInUp} className="w-1/2">
                <AppCard
                  id={desktopApps[1].id}
                  name={desktopApps[1].name}
                  tagline={desktopApps[1].tagline}
                  description={desktopApps[1].description}
                  iconName={desktopApps[1].icon}
                  image={desktopApps[1].image}
                  appType={desktopApps[1].appType}
                  gradient={desktopApps[1].gradient}
                  accentColor={desktopApps[1].accentColor}
                  use3DVariant={desktopApps[1].use3DVariant}
                  use3D={desktopApps[1].use3DCard}
                />
              </motion.div>
            )}
          </div>

          {/* Mobile/Tablet: Stack vertically */}
          <div className="lg:hidden space-y-4">
            {desktopApps.map((app) => (
              <motion.div key={app.id} variants={fadeInUp}>
                <AppCard
                  id={app.id}
                  name={app.name}
                  tagline={app.tagline}
                  description={app.description}
                  iconName={app.icon}
                  image={app.image}
                  appType={app.appType}
                  gradient={app.gradient}
                  accentColor={app.accentColor}
                  use3DVariant={app.use3DVariant}
                  use3D={app.use3DCard}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Row: Mobile Apps (3 cards in a row) */}
        <motion.div
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
        >
          {mobileApps.map((app) => (
            <motion.div key={app.id} variants={fadeInUp} className="w-full flex justify-center">
              <AppCard
                id={app.id}
                name={app.name}
                tagline={app.tagline}
                description={app.description}
                iconName={app.icon}
                image={app.image}
                appType={app.appType}
                gradient={app.gradient}
                accentColor={app.accentColor}
                use3DVariant={app.use3DVariant}
                use3D={app.use3DCard}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}

