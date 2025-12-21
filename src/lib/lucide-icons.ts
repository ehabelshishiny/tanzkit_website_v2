/**
 * Lucide Icons Dynamic Loader
 * Supports ALL Lucide React icons dynamically
 */
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// Get all available icon names from lucide-react
export const AVAILABLE_ICONS = Object.keys(LucideIcons).filter(
  (key) => {
    const value = LucideIcons[key as keyof typeof LucideIcons];
    // Filter out non-icon exports
    return key !== 'createLucideIcon' &&
           key !== 'default' &&
           typeof value === 'object' &&
           value !== null;
  }
);

// Debug: Log available icons count
console.log(`Total Lucide icons available: ${AVAILABLE_ICONS.length}`);

/**
 * Get a Lucide icon component by name
 * @param iconName - The name of the Lucide icon (e.g., 'Zap', 'Shield', 'Users')
 * @param fallback - Optional fallback icon name if the requested icon doesn't exist
 * @returns The Lucide icon component or a fallback
 */
export function getLucideIcon(
  iconName: string | undefined | null,
  fallback: string = 'HelpCircle'
): LucideIcon {
  if (!iconName) {
    return LucideIcons[fallback as keyof typeof LucideIcons] as unknown as LucideIcon;
  }

  // Try to get the icon from lucide-react
  const Icon = LucideIcons[iconName as keyof typeof LucideIcons];

  // Check if it's a valid icon (object with $$typeof property for React components)
  if (Icon && typeof Icon === 'object') {
    return Icon as unknown as LucideIcon;
  }

  // If icon not found, return fallback
  console.warn(`Icon "${iconName}" not found in lucide-react. Using fallback "${fallback}".`);
  return LucideIcons[fallback as keyof typeof LucideIcons] as unknown as LucideIcon;
}

/**
 * Check if an icon name is valid
 */
export function isValidIconName(iconName: string): boolean {
  return AVAILABLE_ICONS.includes(iconName);
}

/**
 * Get popular/commonly used icons for quick selection
 */
export const POPULAR_ICONS = [
  'Zap',
  'Shield',
  'Users',
  'Brain',
  'TrendingUp',
  'CheckCircle',
  'Star',
  'Heart',
  'Bell',
  'Mail',
  'Phone',
  'MapPin',
  'Calendar',
  'Clock',
  'Settings',
  'Search',
  'Filter',
  'Download',
  'Upload',
  'Share',
  'Link',
  'ExternalLink',
  'ChevronRight',
  'ChevronLeft',
  'ChevronUp',
  'ChevronDown',
  'ArrowRight',
  'ArrowLeft',
  'Plus',
  'Minus',
  'X',
  'Check',
  'AlertCircle',
  'Info',
  'HelpCircle',
  'Eye',
  'EyeOff',
  'Lock',
  'Unlock',
  'Key',
  'User',
  'UserPlus',
  'UserMinus',
  'UserCheck',
  'UserX',
  'Home',
  'Building',
  'Building2',
  'Store',
  'ShoppingCart',
  'ShoppingBag',
  'CreditCard',
  'DollarSign',
  'Wallet',
  'Package',
  'Truck',
  'Car',
  'Bus',
  'Bike',
  'Plane',
  'Ship',
  'Train',
  'Rocket',
  'Globe',
  'Map',
  'Navigation',
  'Compass',
  'Target',
  'Flag',
  'Award',
  'Trophy',
  'Medal',
  'Gift',
  'Tag',
  'Bookmark',
  'File',
  'FileText',
  'Folder',
  'FolderOpen',
  'Image',
  'Video',
  'Music',
  'Mic',
  'Camera',
  'Monitor',
  'Smartphone',
  'Tablet',
  'Laptop',
  'Cpu',
  'HardDrive',
  'Database',
  'Server',
  'Cloud',
  'Wifi',
  'Bluetooth',
  'Battery',
  'Power',
  'Zap',
  'Sun',
  'Moon',
  'CloudRain',
  'CloudSnow',
  'Wind',
  'Droplet',
  'Flame',
  'Sparkles',
];

