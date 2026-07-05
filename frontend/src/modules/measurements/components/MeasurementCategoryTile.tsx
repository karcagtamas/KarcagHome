import { Box, IconButton, MenuItem, TextField } from '@mui/material';
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

          <IconButton color="primary" size="small" onClick={handleCreate}>
            <AddOutlined />
          </IconButton>
        </Box>
      }
    >
      <LoadingBox isLoading={isYearsLoading || isMeasurementsLoading}>
        {measurements?.map((measurement) => (
          <div key={measurement.id}>asd</div>
        ))}
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
