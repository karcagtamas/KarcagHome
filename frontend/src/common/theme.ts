import { createTheme, type Theme } from '@mui/material';

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

const interFont = "'Fredoka', sans-serif";
const plexFont = "'IBM Plex Sans', sans-serif";

const slateBlueLightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#28568a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
    },
    divider: '#dbe3ee',
  },
  typography: {
    fontFamily: interFont,
  },
});
const graphiteEmeraldLightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#256553',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7faf9',
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
    },
    divider: '#d7e5df',
  },
  typography: {
    fontFamily: plexFont,
  },
});
const slateBlueDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f7dbc',
    },
    background: {
      default: '#0f172a',
      paper: '#162033',
    },
    text: {
      primary: '#f1f5f9',
    },
    divider: '#334155',
  },
  typography: {
    fontFamily: interFont,
  },
});
const graphiteEmeraldDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#38927a',
    },
    background: {
      default: '#111827',
      paper: '#1b2430',
    },
    text: {
      primary: '#f3f4f6',
    },
    divider: '#374151',
  },
  typography: {
    fontFamily: plexFont,
  },
});

export const THEMES: Record<ThemeKey, AppTheme> = {
  'slate-blue-light': { theme: slateBlueLightTheme, isDark: false, caption: 'Slate-Blue Light' },
  'slate-blue-dark': { theme: slateBlueDarkTheme, isDark: true, caption: 'Slate-Blue Dark' },
  'graphite-emerald-light': { theme: graphiteEmeraldLightTheme, isDark: false, caption: 'Graphite-Emerald Light' },
  'graphite-emerald-dark': { theme: graphiteEmeraldDarkTheme, isDark: true, caption: 'Graphite-Emerald Dark' },
};
