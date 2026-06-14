import type { Theme } from '@mui/material';

export type ThemePalette = {
  fgColor: string;
  bgColor: string;
};

export type ThemeColors = {
  light: ThemePalette;
  dark: ThemePalette;
};

export const getPaletteByTheme = (colors: ThemeColors, theme: Theme): ThemePalette => {
  return theme.palette.mode === 'light' ? colors.light : colors.dark;
};
