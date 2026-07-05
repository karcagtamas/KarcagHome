import { Box, IconButton, MenuItem, TextField } from '@mui/material';
import { ContentCard } from '../../../components/common/ContentCard';
import type { MeasurementCategoryDTO } from '../models/measurement';
import { useState } from 'react';
import { AddOutlined } from '@mui/icons-material';
import { useMeasurements } from '../hooks/useMeasurements';
import { useMeasurementYears } from '../hooks/useMeasurementYears';
import { LoadingBox } from '../../../components/common/LoadingBox';

type Props = {
  category: MeasurementCategoryDTO;
};

export const MeasurementCategoryTile: React.FC<Props> = ({ category }) => {
  const { data: years, isLoading: isYearsLoading } = useMeasurementYears(category.id);
  const [year, setYear] = useState<number | null>(years && years.length > 0 ? years[years.length - 1] : null);
  const { data: measurements, isLoading: isMeasurementsLoading } = useMeasurements(category.id, year);

  return (
    <ContentCard
      caption={category.name}
      actions={
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
          <TextField
            select
            size="small"
            label="Year"
            value={year ?? undefined}
            onChange={(e) => setYear(e.target.value ? Number(e.target.value) : null)}
            sx={{ minWidth: 100 }}
          >
            <MenuItem value={undefined}>All</MenuItem>
            {years?.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </TextField>

          <IconButton color="primary" size="small">
            <AddOutlined />
          </IconButton>
        </Box>
      }
    >
      <LoadingBox isLoading={isYearsLoading || isMeasurementsLoading}>Alma</LoadingBox>
    </ContentCard>
  );
};
