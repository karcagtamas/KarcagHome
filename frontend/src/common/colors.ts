import type { Theme } from '@mui/material';
import tinycolor from 'tinycolor2';

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

export const getInvertedColor = (color: string): string => {
  const tc = tinycolor(color);
  const { r, g, b } = tc.toRgb();
  const inverted = { r: 255 - r, g: 255 - g, b: 255 - b };

  return tinycolor(inverted).toHexString();
};

export const getContrastColor = (color: string, lightColor: string = '#FFFFFF', darkColor: string = '#000000'): string => {
  const tc = tinycolor(color);

  if (!tc.isValid()) {
    throw new Error('Invalid color input: ' + color);
  }

  return tc.isLight() ? darkColor : lightColor;
};
