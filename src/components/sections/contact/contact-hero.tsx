'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Typography } from '@/components/ui/typography';

interface ContactHeroProps {
  data: {
    title: string;
    subtitle: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    email: string;
    phone: string;
    location: string;
  };
}

export function ContactHero({ data }: ContactHeroProps) {
  return (
    <section className="relative w-full bg-gradient-to-b from-primary/5 to-background py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Typography variant="display" as="h1" align="center" className="mb-6">
            {data.title}
          </Typography>
          <Typography variant="subtitle" align="center" className="text-muted-foreground max-w-2xl mx-auto">
            {data.subtitle}
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          <div className="text-center px-2">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <Typography variant="h4" align="center" className="font-semibold mb-2">
              {data.emailLabel}
            </Typography>
            <Typography variant="body" align="center" className="text-muted-foreground break-words">
              {data.email}
            </Typography>
          </div>
          <div className="text-center px-2">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <Typography variant="h4" align="center" className="font-semibold mb-2">
              {data.phoneLabel}
            </Typography>
            <Typography variant="body" align="center" className="text-muted-foreground break-words">
              {data.phone}
            </Typography>
          </div>
          <div className="text-center px-2">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <Typography variant="h4" align="center" className="font-semibold mb-2">
              {data.locationLabel}
            </Typography>
            <Typography variant="body" align="center" className="text-muted-foreground break-words">
              {data.location}
            </Typography>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
