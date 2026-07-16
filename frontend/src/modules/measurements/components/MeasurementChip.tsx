import { Box } from '@mui/material';
import type { MeasurementDTO } from '../models/measurement';
import { useMemo } from 'react';
import { getContrastColor } from '../../../common/colors';

type Props = {
  measurement: MeasurementDTO;
};

export const MeasurementChip: React.FC<Props> = ({ measurement }) => {
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
      }}
    >
      <span><strong>{measurement.value}</strong>{measurement.category.unit}</span> <small>({measurement.date})</small>
    </Box>
  );
};
