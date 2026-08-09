import '@/global.css';
import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0a0a0a',
    background: '#ebe9e1',
    backgroundElement: '#f6f3eb',
    backgroundSelected: '#f1ede2',
    textSecondary: '#6a6a64',
    yellow: '#fde351',
    yellowBorder: '#d8b020',
  },
  dark: {
    text: '#FAF9F6',
    background: '#0a0a0a',
    backgroundElement: '#1a1a1a',
    backgroundSelected: '#2A2A2A',
    textSecondary: '#8a8a84',
    yellow: '#fde351',
    yellowBorder: '#d8b020',
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
