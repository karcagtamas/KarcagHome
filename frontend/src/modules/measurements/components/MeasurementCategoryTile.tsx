import { Box, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { ContentCard } from '../../../components/common/ContentCard';
import type { MeasurementCategoryDTO, MeasurementEditDTO } from '../models/measurement';
import { useState } from 'react';
import { AddOutlined } from '@mui/icons-material';
import { useMeasurements } from '../hooks/useMeasurements';
import { useMeasurementYears } from '../hooks/useMeasurementYears';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { MeasurementEditDialog } from '../dialogs/MeasurementEditDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { measurementApi } from '../api/measurement.api';
import { measurementKeys } from '../../../keys/measurementKeys';
import { MeasurementChip } from './MeasurementChip';
import { MeasurementChart } from './MeasurementChart';

type Props = {
  category: MeasurementCategoryDTO;
};

export const MeasurementCategoryTile: React.FC<Props> = ({ category }) => {
  const queryClient = useQueryClient();
  const [measurementDialogOpen, setMeasurementDialogOpen] = useState(false);
  const { data: years, isLoading: isYearsLoading } = useMeasurementYears(category.id);
  const [year, setYear] = useState<number | null>(years && years.length > 0 ? years[years.length - 1] : null);
  const { data: measurements, isLoading: isMeasurementsLoading } = useMeasurements(category.id, year);

  const handleCreate = () => {
    setMeasurementDialogOpen(true);
  };

  const createMutation = useMutation({
    mutationFn: measurementApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: measurementKeys.all });
    },
  });

  const apiLoading = createMutation.isPending;

  const handleSubmit = async (data: MeasurementEditDTO, _?: number) => {
    try {
      await createMutation.mutateAsync(data);
    } catch (err) {
      console.error('Measurement category payload submission failed', err);
    }
  };

  return (
    <ContentCard
      caption={
        <Typography variant="h5" sx={{ color: category.color }}>
          <strong>{category.name}</strong>
        </Typography>
      }
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

          <IconButton color="primary" size="small" onClick={handleCreate}>
            <AddOutlined />
          </IconButton>
        </Box>
      }
    >
      <LoadingBox isLoading={isYearsLoading || isMeasurementsLoading}>
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '4px', padding: '8px' }}>
            {measurements?.map((measurement) => (
              <MeasurementChip key={measurement.id} measurement={measurement} />
            ))}
          </Box>

          <MeasurementChart category={category} measurements={measurements ?? []} />
        </Box>
      </LoadingBox>

      {measurementDialogOpen && (
        <MeasurementEditDialog
          key={'create-measurement'}
          open={measurementDialogOpen}
          measurement={null}
          measurementCategory={category}
          loading={apiLoading}
          onClose={() => setMeasurementDialogOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </ContentCard>
  );
};
