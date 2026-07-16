import { Box, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import { ContentCard } from '../../../components/common/ContentCard';
import type { MeasurementCategoryDTO, MeasurementDTO, MeasurementEditDTO } from '../models/measurement';
import { useState } from 'react';
import { AddOutlined } from '@mui/icons-material';
import { useMeasurements } from '../hooks/useMeasurements';
import { useMeasurementYears } from '../hooks/useMeasurementYears';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { MeasurementEditDialog } from '../dialogs/MeasurementEditDialog';
import { MeasurementChip } from './MeasurementChip';
import { MeasurementChart } from './MeasurementChart';
import { useMeasurementMutations } from '../hooks/useMeasurementMutations';

type Props = {
  category: MeasurementCategoryDTO;
};

export const MeasurementCategoryTile: React.FC<Props> = ({ category }) => {
  const [measurementDialogOpen, setMeasurementDialogOpen] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState<MeasurementDTO | null>(null);
  const { data: years, isLoading: isYearsLoading } = useMeasurementYears(category.id);
  const [year, setYear] = useState<number | null>(years && years.length > 0 ? years[years.length - 1] : null);
  const { data: measurements, isLoading: isMeasurementsLoading } = useMeasurements(category.id, year);

  const { createMutation, updateMutation, removeMutation, isPending: apiLoading } = useMeasurementMutations();

  const handleCreate = () => {
    setSelectedMeasurement(null);
    setMeasurementDialogOpen(true);
  };

  const handleEdit = (measurement: MeasurementDTO) => {
    setSelectedMeasurement(measurement);
    setMeasurementDialogOpen(true);
  };

  const handleRemove = async (measurementCategory: MeasurementDTO) => {
    try {
      await removeMutation.mutateAsync(measurementCategory.id);
    } catch (err) {
      console.error('Measurement category deletion encountered errors', err);
    }
  };

  const handleSubmit = async (data: MeasurementEditDTO, id?: number) => {
    try {
      if (id) {
        await updateMutation.mutateAsync({ id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
    } catch (err) {
      console.error('Measurement payload submission failed', err);
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
              <MeasurementChip
                key={measurement.id}
                measurement={measurement}
                disabled={apiLoading}
                onDelete={() => handleRemove(measurement)}
              />
            ))}
          </Box>

          <MeasurementChart category={category} measurements={measurements ?? []} />
        </Box>
      </LoadingBox>

      {measurementDialogOpen && (
        <MeasurementEditDialog
          key={selectedMeasurement ? `edit-measurement-${selectedMeasurement.id}` : 'create-measurement'}
          open={measurementDialogOpen}
          measurement={selectedMeasurement}
          measurementCategory={category}
          loading={apiLoading}
          onClose={() => setMeasurementDialogOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </ContentCard>
  );
};
