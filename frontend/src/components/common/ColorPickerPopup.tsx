import {
  AlphaSlider,
  Button,
  ColorArea,
  ColorPicker,
  ColorSlider,
  makeStyles,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  tokens,
  type ColorPickerProps,
} from '@fluentui/react-components';
import { tinycolor } from '@ctrl/tinycolor';

import React, { useCallback, useEffect } from 'react';

const useStyles = makeStyles({
  example: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  previewColor: {
    margin: '10px 0',
    width: '50px',
    height: '50px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
    },
  },
  row: {
    display: 'flex',
    gap: '10px',
  },
  sliders: {
    display: 'flex',
    flexDirection: 'column',
  },
});

type HSV = {
  h: number;
  s: number;
  v: number;
  a: number;
};

type Props = {
  color: string;
  onColorChange: (color: string) => void;
};

const DEFAULT_COLOR_HSV = { h: 109, s: 1, v: 0.9, a: 1 };

export const ColorPickerPopup: React.FC<Props> = ({ color, onColorChange }) => {
  const styles = useStyles();
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  const toHSV = useCallback((hex: string): HSV => {
    const c = tinycolor(hex).toHsv();

    return {
      h: c.h,
      s: c.s,
      v: c.v,
      a: c.a ?? 1,
    };
  }, []);

  const fromHSV = useCallback((hsv: HSV): string => {
    return tinycolor(hsv).toHexString();
  }, []);

  const [previewColor, setPreviewColor] = React.useState<HSV>(() => toHSV(color));
  const [committedColor, setCommittedColor] = React.useState<HSV>(() => toHSV(color));

  useEffect(() => {
    if (popoverOpen) {
      setPreviewColor(toHSV(color));
    }

    setCommittedColor(toHSV(color));
  }, [popoverOpen, color, toHSV]);

  const handleChange: ColorPickerProps['onColorChange'] = (_, data) => {
    setPreviewColor({ ...data.color, a: data.color.a ?? 1 });
  };

  const handleCancel = () => {
    setPreviewColor(committedColor);
    setPopoverOpen(false);
  };

  const handleOk = () => {
    const hex = fromHSV(previewColor);

    setCommittedColor(previewColor);
    onColorChange(hex);
    setPopoverOpen(false);
  };

  return (
    <>
      <Popover open={popoverOpen} trapFocus onOpenChange={(_, data) => setPopoverOpen(data.open)}>
        <PopoverTrigger disableButtonEnhancement>
          <Button>Choose color</Button>
        </PopoverTrigger>

        <PopoverSurface>
          <ColorPicker color={previewColor} onColorChange={handleChange}>
            <ColorArea inputX={{ 'aria-label': 'Saturation' }} inputY={{ 'aria-label': 'Brightness' }} />
            <div className={styles.row}>
              <div className={styles.sliders}>
                <ColorSlider aria-label="Hue" />
                <AlphaSlider aria-label="Alpha" />
              </div>
              <div
                className={styles.previewColor}
                style={{
                  backgroundColor: tinycolor(previewColor).toRgbString(),
                }}
              />
            </div>
          </ColorPicker>

          <div className={styles.row}>
            <Button appearance="primary" onClick={handleOk}>
              Ok
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </PopoverSurface>
      </Popover>
      <div className={styles.previewColor} style={{ backgroundColor: color }} />
    </>
  );
};
