import { Box, Button, Popover } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ColorPicker from 'react-best-gradient-color-picker';

type Props = {
  color: string;
  onColorChange: (color: string) => void;
};

export const ColorPickerPopup: React.FC<Props> = ({ color, onColorChange }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [previewColor, setPreviewColor] = React.useState<string>(color);
  const [committedColor, setCommittedColor] = React.useState<string>(color);

  useEffect(() => {
    setPreviewColor(color);
    setCommittedColor(color);
  }, [color]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPreviewColor(committedColor);
    setAnchorEl(event.currentTarget);
  };

  const handleCancel = () => {
    setPreviewColor(committedColor);
    setAnchorEl(null);
  };

  const handleOk = () => {
    setCommittedColor(previewColor);
    onColorChange(previewColor);
    setAnchorEl(null);
  };

  const popoverOpen = Boolean(anchorEl);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button variant="outlined" onClick={handleOpen} size="small">
        Choose color
      </Button>

      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleCancel}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            sx: { padding: 2, display: 'flex', flexDirection: 'column', gap: 2 },
          },
        }}
      >
        <ColorPicker
          value={previewColor}
          onChange={setPreviewColor}
          hideControls
          hideInputs
          hidePresets
          hideOpacity={false}
        />

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
          <Button variant="contained" size="small" onClick={handleOk}>
            Ok
          </Button>
          <Button variant="text" size="small" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Popover>

      <Box
        sx={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: committedColor,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 1,
        }}
      />
    </Box>
  );
};
