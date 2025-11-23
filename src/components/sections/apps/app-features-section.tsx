'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/ui/section-container';
import { fadeInUp } from '@/lib/animation-variants';
import { getIconComponent } from '@/lib/icon-mapper';
import type { IconName } from '@/config/apps';

interface Feature {
  iconName: IconName;
  title: string;
  description: string;
}

interface AppFeaturesSectionProps {
  title: string;
  description: string;
  features: Feature[];
  accentColor: string;
}

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

export function AppFeaturesSection({
  title,
  description,
  features,
  accentColor,
}: AppFeaturesSectionProps) {
  return (
    <SectionContainer background="light" padding="xl" maxWidth="2xl">
      {/* Section Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          {title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {features.map((feature, index) => {
          const FeatureIcon = getIconComponent(feature.iconName);
          return (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-muted/50"
                style={{ color: accentColor }}
              >
                <FeatureIcon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionContainer>
  );
}

