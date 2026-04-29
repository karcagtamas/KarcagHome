import { createLightTheme, createDarkTheme, type BrandVariants, type Theme } from '@fluentui/react-components';

export type ThemeKey = 'slate-blue-light' | 'slate-blue-dark' | 'graphite-emerald-light' | 'graphite-emerald-dark';
export const DEFAULT_THEME: ThemeKey = 'slate-blue-light';
export const THEME_STORAGE_KEY = 'apptheme';
export const getInitialTheme = (): ThemeKey => {
  const saved = localStorage.getItem(THEME_STORAGE_KEY) ?? '';

  if (
    saved != null &&
    ['slate-blue-light', 'slate-blue-dark', 'graphite-emerald-light', 'graphite-emerald-dark'].includes(saved)
  ) {
    return saved as ThemeKey;
  }

  return DEFAULT_THEME;
};

type AppTheme = {
  theme: Theme;
  isDark: boolean;
  caption: string;
};

const slateBlueBrand: BrandVariants = {
  10: '#0f172a',
  20: '#132238',
  30: '#1a2e4a',
  40: '#1f3b5f',
  50: '#234874',
  60: '#28568a',
  70: '#2f66a3',
  80: '#3f7dbc',
  90: '#5a95d1',
  100: '#79addf',
  110: '#9ac4ea',
  120: '#bfdcf4',
  130: '#dbeaf9',
  140: '#edf5fc',
  150: '#f8fbfe',
  160: '#ffffff',
};

const graphiteEmeraldBrand: BrandVariants = {
  10: '#07130f',
  20: '#0d1f18',
  30: '#123026',
  40: '#184034',
  50: '#1e5243',
  60: '#256553',
  70: '#2d7a65',
  80: '#38927a',
  90: '#52ab91',
  100: '#74c3aa',
  110: '#9ad7c3',
  120: '#c2eadc',
  130: '#dcf5ed',
  140: '#eefbf7',
  150: '#f8fefd',
  160: '#ffffff',
};

const slateBlueLightTheme = createLightTheme(slateBlueBrand);
const graphiteEmeraldLightTheme = createLightTheme(graphiteEmeraldBrand);
const slateBlueDarkTheme = createDarkTheme(slateBlueBrand);
const graphiteEmeraldDarkTheme = createDarkTheme(graphiteEmeraldBrand);

const interFont = "'Fredoka', sans-serif";
const plexFont = "'IBM Plex Sans', sans-serif";

slateBlueLightTheme.fontFamilyBase = interFont;
slateBlueLightTheme.colorNeutralBackground1 = '#f8fafc';
slateBlueLightTheme.colorNeutralBackground2 = '#ffffff';
slateBlueLightTheme.colorNeutralStroke1 = '#dbe3ee';
slateBlueLightTheme.colorNeutralForeground1 = '#0f172a';
slateBlueLightTheme.colorBrandBackground = '#28568a';
slateBlueLightTheme.colorBrandForeground1 = '#ffffff';
slateBlueDarkTheme.fontFamilyBase = interFont;
slateBlueDarkTheme.colorNeutralBackground1 = '#0f172a';
slateBlueDarkTheme.colorNeutralBackground2 = '#162033';
slateBlueDarkTheme.colorNeutralForeground1 = '#f1f5f9';
slateBlueDarkTheme.colorNeutralStroke1 = '#334155';

graphiteEmeraldLightTheme.fontFamilyBase = plexFont;
graphiteEmeraldLightTheme.colorNeutralBackground1 = '#f7faf9';
graphiteEmeraldLightTheme.colorNeutralBackground2 = '#ffffff';
graphiteEmeraldLightTheme.colorNeutralStroke1 = '#d7e5df';
graphiteEmeraldLightTheme.colorNeutralForeground1 = '#111827';
graphiteEmeraldLightTheme.colorBrandBackground = '#256553';
graphiteEmeraldLightTheme.colorBrandForeground1 = '#ffffff';
graphiteEmeraldDarkTheme.fontFamilyBase = plexFont;
graphiteEmeraldDarkTheme.colorNeutralBackground1 = '#111827';
graphiteEmeraldDarkTheme.colorNeutralBackground2 = '#1b2430';
graphiteEmeraldDarkTheme.colorNeutralForeground1 = '#f3f4f6';
graphiteEmeraldDarkTheme.colorNeutralStroke1 = '#374151';

export const THEMES: Record<ThemeKey, AppTheme> = {
  'slate-blue-light': { theme: slateBlueLightTheme, isDark: false, caption: 'Slate-Blue Light' },
  'slate-blue-dark': { theme: slateBlueDarkTheme, isDark: true, caption: 'Slate-Blue Dark' },
  'graphite-emerald-light': { theme: graphiteEmeraldLightTheme, isDark: false, caption: 'Graphite-Emerald Light' },
  'graphite-emerald-dark': { theme: graphiteEmeraldDarkTheme, isDark: true, caption: 'Graphite-Emerald Dark' },
};
