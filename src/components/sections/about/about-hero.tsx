'use client';

import { motion } from 'framer-motion';
import { Typography } from '@/components/ui/typography';

interface AboutHeroProps {
  data: {
    title: string;
    subtitle: string;
    stats: {
      enterprises: {
        value: string;
        label: string;
      };
      drivers: {
        value: string;
        label: string;
      };
      trips: {
        value: string;
        label: string;
      };
    };
  };
}

export function AboutHero({ data }: AboutHeroProps) {
  return (
    <section className="w-full bg-gradient-to-b from-primary/5 to-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="display" as="h1" align="center" className="mb-6">
            {data.title}
          </Typography>
          <Typography variant="subtitle" align="center" className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {data.subtitle}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12"
        >
          <div>
            <Typography variant="h1" className="text-primary mb-2">
              {data.stats.enterprises.value}
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              {data.stats.enterprises.label}
            </Typography>
          </div>
          <div>
            <Typography variant="h1" className="text-primary mb-2">
              {data.stats.drivers.value}
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              {data.stats.drivers.label}
            </Typography>
          </div>
          <div>
            <Typography variant="h1" className="text-primary mb-2">
              {data.stats.trips.value}
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              {data.stats.trips.label}
            </Typography>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
