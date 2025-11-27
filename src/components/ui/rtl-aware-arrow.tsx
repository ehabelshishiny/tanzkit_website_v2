'use client';

import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLocale } from 'next-intl';
import { ComponentProps } from 'react';

type ArrowProps = ComponentProps<typeof ArrowRight>;

/**
 * RTL-Aware Arrow Component
 * Automatically renders ArrowLeft for RTL (Arabic) and ArrowRight for LTR (English)
 * Also handles positioning via CSS classes
 */
export function RTLAwareArrow(props: ArrowProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Render ArrowLeft for RTL, ArrowRight for LTR
  return isRTL ? <ArrowLeft {...props} /> : <ArrowRight {...props} />;
}
