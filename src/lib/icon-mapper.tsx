/**
 * Icon Mapper - Legacy Support
 * This file is kept for backward compatibility with existing code
 * New code should use getLucideIcon from '@/lib/lucide-icons'
 */
import {
  Users,
  Car,
  UserCircle,
  LayoutDashboard,
  Building2,
  MapPin,
  Clock,
  Shield,
  BarChart3,
  Route,
  Bell,
  CreditCard,
  MessageSquare,
  CheckCircle,
  Zap,
  TrendingUp,
  type LucideIcon
} from 'lucide-react';
import type { IconName } from '@/config/apps';
import { getLucideIcon } from './lucide-icons';

const iconMap: Record<IconName, LucideIcon> = {
  Users,
  Car,
  UserCircle,
  LayoutDashboard,
  Building2,
  MapPin,
  Clock,
  Shield,
  BarChart3,
  Route,
  Bell,
  CreditCard,
  MessageSquare,
  CheckCircle,
  Zap,
  TrendingUp,
};

/**
 * @deprecated Use getLucideIcon from '@/lib/lucide-icons' instead
 * This function is kept for backward compatibility
 */
export function getIconComponent(iconName: IconName): LucideIcon {
  return iconMap[iconName];
}

/**
 * Get any Lucide icon by name (supports all 1000+ icons)
 * @param iconName - The name of the Lucide icon
 * @param fallback - Optional fallback icon name
 */
export { getLucideIcon };

