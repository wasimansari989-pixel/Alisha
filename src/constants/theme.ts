import '@/global.css';
import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#141416',
    background: '#F8F3E7',
    backgroundElement: '#FAF9F6',
    backgroundSelected: '#F2EAD6',
    textSecondary: '#8B847A',
  },
  dark: {
    text: '#FAF9F6',
    background: '#141416',
    backgroundElement: '#232326',
    backgroundSelected: '#2E3135',
    textSecondary: '#8B847A',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 1280;
