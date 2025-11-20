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

export function getIconComponent(iconName: IconName): LucideIcon {
  return iconMap[iconName];
}

