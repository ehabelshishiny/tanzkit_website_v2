'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { appsArray } from '@/config/apps';
import { AppCard } from '@/components/ui/app-card';
import { Typography } from '@/components/ui/typography';
import { SectionContainer } from '@/components/ui/section-container';
import { fadeInUp } from '@/lib/animation-variants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
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
      background="light"
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
        <Typography variant="h2" className="mb-4 text-foreground">
          {t('title')}
        </Typography>
        <Typography variant="body" className="text-muted-foreground max-w-2xl mx-auto">
          {t('subtitle')}
        </Typography>
      </motion.div>

      {/* Bento Grid Layout - Glassmorphism Style */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="space-y-6"
      >
        {/* Desktop View: Bento Grid */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-x-8 gap-y-8 auto-rows-min mx-">
          {/* Row 1: Desktop 1 (60%) + Mobile 1 (20%) + Mobile 2 (20%) */}
          {desktopApps[0] && (
            <motion.div
              variants={cardVariants}
              className="col-span-3 col-start-1 row-start-1"
            >
              <div className="h-[570px]">
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
              </div>
            </motion.div>
          )}

          {mobileApps[0] && (
            <motion.div
              variants={cardVariants}
              className="col-span-1 row-start-1"
            >
              <div className="h-[570px]">
                <AppCard
                  id={mobileApps[0].id}
                  name={mobileApps[0].name}
                  tagline={mobileApps[0].tagline}
                  description={mobileApps[0].description}
                  iconName={mobileApps[0].icon}
                  image={mobileApps[0].image}
                  appType={mobileApps[0].appType}
                  gradient={mobileApps[0].gradient}
                  accentColor={mobileApps[0].accentColor}
                  use3DVariant={mobileApps[0].use3DVariant}
                  use3D={mobileApps[0].use3DCard}
                />
              </div>
            </motion.div>
          )}

          {mobileApps[1] && (
            <motion.div
              variants={cardVariants}
              className="col-span-1 row-start-1"
            >
              <div className="h-[570px]">
                <AppCard
                  id={mobileApps[1].id}
                  name={mobileApps[1].name}
                  tagline={mobileApps[1].tagline}
                  description={mobileApps[1].description}
                  iconName={mobileApps[1].icon}
                  image={mobileApps[1].image}
                  appType={mobileApps[1].appType}
                  gradient={mobileApps[1].gradient}
                  accentColor={mobileApps[1].accentColor}
                  use3DVariant={mobileApps[1].use3DVariant}
                  use3D={mobileApps[1].use3DCard}
                />
              </div>
            </motion.div>
          )}

          {/* Row 2: Desktop 2 (80%) + Mobile 3 (20%) */}
          {desktopApps[1] && (
            <motion.div
              variants={cardVariants}
              className="col-span-4 col-start-1 row-start-2"
            >
              <div className="h-[570px]">
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
              </div>
            </motion.div>
          )}

          {mobileApps[2] && (
            <motion.div
              variants={cardVariants}
              className="col-span-1 row-start-2"
            >
              <div className="h-[570px]">
                <AppCard
                  id={mobileApps[2].id}
                  name={mobileApps[2].name}
                  tagline={mobileApps[2].tagline}
                  description={mobileApps[2].description}
                  iconName={mobileApps[2].icon}
                  image={mobileApps[2].image}
                  appType={mobileApps[2].appType}
                  gradient={mobileApps[2].gradient}
                  accentColor={mobileApps[2].accentColor}
                  use3DVariant={mobileApps[2].use3DVariant}
                  use3D={mobileApps[2].use3DCard}
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Tablet View (768px - 1023px): Desktop full width, 3 mobile apps in one row */}
        <div className="hidden md:block lg:hidden space-y-4">
          {/* Desktop apps */}
          {desktopApps.map((app) => (
            <motion.div key={app.id} variants={cardVariants}>
              <div className="aspect-[16/9]">
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
              </div>
            </motion.div>
          ))}

          {/* Mobile apps in one row */}
          <div className="grid grid-cols-3 gap-4">
            {mobileApps.map((app) => (
              <motion.div key={app.id} variants={cardVariants}>
                <div className="aspect-[9/16]">
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View (<768px): All cards stack vertically */}
        <div className="md:hidden space-y-4">
          {/* Desktop apps first */}
          {desktopApps.map((app) => (
            <motion.div key={app.id} variants={cardVariants}>
              <div className="aspect-[16/9]">
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
              </div>
            </motion.div>
          ))}

          {/* Then mobile apps */}
          {mobileApps.map((app) => (
            <motion.div key={app.id} variants={cardVariants}>
              <div className="aspect-[9/16] max-w-sm mx-auto">
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
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
}
