import { Box, IconButton } from '@mui/material';
import type { MeasurementDTO } from '../models/measurement';
import { useMemo } from 'react';
import { getContrastColor } from '../../../common/colors';
import { DeleteOutlined } from '@mui/icons-material';

type Props = {
  measurement: MeasurementDTO;
  disabled?: boolean;
  onDelete?: () => void;
};

export const MeasurementChip: React.FC<Props> = ({ measurement, disabled = false, onDelete }) => {
  const contrastColor = useMemo(() => {
    return getContrastColor(measurement.category.color);
  }, [measurement]);

  return (
    <Box
      sx={{
        backgroundColor: measurement.category.color,
        color: contrastColor,
        padding: '4px',
        borderRadius: '8px',
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.5rem',
        whiteSpace: 'nowrap',
      }}
    >
      <span>
        <strong>{measurement.value}</strong>
        {measurement.category.unit}
      </span>{' '}
      <small>({measurement.date})</small>
      {onDelete && (
        <IconButton color="error" size="small" disabled={disabled} onClick={onDelete}>
          <DeleteOutlined fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};
