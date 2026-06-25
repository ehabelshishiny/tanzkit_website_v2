'use client';

import { createElement, useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import { type StringInputProps, set, unset } from 'sanity';
import { Autocomplete, Card, Stack, Text, Box } from '@sanity/ui';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

type IconComponent = ComponentType<LucideProps>;

function getIconComponent(iconName: string | undefined): IconComponent | null {
  if (!iconName) {
    return null;
  }

  const icon = LucideIcons[iconName as keyof typeof LucideIcons];
  return typeof icon === 'function' ? (icon as IconComponent) : null;
}

function renderIcon(iconName: string | undefined, size: number) {
  const Icon = getIconComponent(iconName);
  return Icon ? createElement(Icon, { size }) : null;
}

// Get all available Lucide icon names
const AVAILABLE_ICONS = Object.keys(LucideIcons).filter(
  (key) =>
    key !== 'createLucideIcon' &&
    key !== 'default' &&
    typeof LucideIcons[key as keyof typeof LucideIcons] === 'function'
);

// Popular icons for quick access
const POPULAR_ICONS = [
  'Brain', 'Zap', 'Shield', 'Users', 'TrendingUp', 'CheckCircle', 'Star',
  'Heart', 'Bell', 'Mail', 'Phone', 'MapPin', 'Calendar',
  'Clock', 'Settings', 'Search', 'Filter', 'Download', 'Upload',
  'Share', 'Link', 'Home', 'Building', 'Building2', 'Car',
  'Truck', 'Bus', 'Plane', 'Ship', 'Package', 'ShoppingCart',
  'CreditCard', 'DollarSign', 'User', 'UserPlus', 'Globe',
  'Map', 'Navigation', 'Target', 'Award', 'Trophy', 'Gift',
  'Tag', 'Bookmark', 'File', 'FileText', 'Folder', 'Image',
  'Video', 'Music', 'Camera', 'Monitor', 'Smartphone', 'Laptop',
  'Database', 'Server', 'Cloud', 'Wifi', 'Battery', 'Sun', 'Moon',
];

export function IconPicker(props: StringInputProps) {
  const { value, onChange, elementProps } = props;
  const [searchQuery, setSearchQuery] = useState('');

  // Filter icons based on search query
  const filteredIcons = useMemo(() => {
    if (!searchQuery) {
      return POPULAR_ICONS;
    }
    return AVAILABLE_ICONS.filter((icon) =>
      icon.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 50); // Limit to 50 results for performance
  }, [searchQuery]);

  const handleChange = (newValue: string) => {
    onChange(newValue ? set(newValue) : unset());
  };

  const handleQueryChange = (query: string | null) => {
    setSearchQuery(query || '');
  };

  const hasSelectedIcon = Boolean(getIconComponent(value));

  return (
    <Stack space={3}>
      {/* Icon Preview */}
      {hasSelectedIcon && (
        <Card padding={3} radius={2} shadow={1} tone="primary">
          <Stack space={2}>
            <Text size={1} weight="semibold">Preview:</Text>
            <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {renderIcon(value, 24)}
              <Text size={2} weight="medium">{value}</Text>
            </Box>
          </Stack>
        </Card>
      )}

      {/* Autocomplete Input */}
      <Autocomplete
        fontSize={2}
        icon={() => renderIcon(value, 16)}
        id={elementProps.id}
        options={filteredIcons.map((icon) => ({ value: icon }))}
        placeholder="Search for an icon (e.g., Zap, Shield, Users)..."
        value={value || ''}
        onChange={handleChange}
        onQueryChange={handleQueryChange}
        renderOption={(option) => {
          return (
            <Card as="button" padding={2}>
              <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {renderIcon(option.value, 18)}
                <Text size={2}>{option.value}</Text>
              </Box>
            </Card>
          );
        }}
      />

      {/* Helper Text */}
      <Card padding={2} radius={2} tone="transparent">
        <Text size={1} muted>
          {searchQuery
            ? `Showing ${filteredIcons.length} icons matching "${searchQuery}"`
            : `Showing ${POPULAR_ICONS.length} popular icons. Type to search all ${AVAILABLE_ICONS.length}+ icons.`}
        </Text>
      </Card>

      {/* Quick Selection Grid for Popular Icons */}
      {!searchQuery && (
        <Card padding={3} radius={2} shadow={1}>
          <Stack space={3}>
            <Text size={1} weight="semibold">Popular Icons:</Text>
            <Box
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                gap: '8px',
              }}
            >
              {POPULAR_ICONS.slice(0, 24).map((iconName) => {
                return (
                  <Card
                    key={iconName}
                    as="button"
                    padding={2}
                    radius={2}
                    tone={value === iconName ? 'primary' : 'default'}
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                    onClick={() => handleChange(iconName)}
                  >
                    <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      {renderIcon(iconName, 20)}
                      <Text size={0}>{iconName}</Text>
                    </Box>
                  </Card>
                );
              })}
            </Box>
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
