import { Box, IconButton } from '@mui/material';
import type { MeasurementDTO } from '../models/measurement';
import { useMemo } from 'react';
import { getContrastColor } from '../../../common/colors';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';

type Props = {
  measurement: MeasurementDTO;
  disabled?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const MeasurementChip: React.FC<Props> = ({ measurement, disabled = false, onEdit, onDelete }) => {
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
        gap: '4px',
        whiteSpace: 'nowrap',
      }}
    >
      <span>
        <strong>{measurement.value}</strong>
        {measurement.category.unit}
      </span>{' '}
      <small>({measurement.date})</small>
      {onEdit && (
        <IconButton color="warning" size="small" disabled={disabled} onClick={onEdit}>
          <EditOutlined fontSize="small" />
        </IconButton>
      )}
      {onDelete && (
        <IconButton color="error" size="small" disabled={disabled} onClick={onDelete}>
          <DeleteOutlined fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};
