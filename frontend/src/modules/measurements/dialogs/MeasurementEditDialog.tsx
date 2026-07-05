import { useEffect } from 'react';
import type { MeasurementCategoryDTO, MeasurementDTO, MeasurementEditDTO } from '../models/measurement';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { Box, MenuItem, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useMeasurementCategories } from '../hooks/useMeasurementCategories';

type Props = {
  open: boolean;
  measurement: MeasurementDTO | null;
  measurementCategory?: MeasurementCategoryDTO;
  onClose: () => void;
  onSubmit: (data: MeasurementEditDTO, id?: number) => Promise<void>;
  loading?: boolean;
};

export const MeasurementEditDialog: React.FC<Props> = ({ open, measurement, measurementCategory, onClose, onSubmit, loading }) => {
  const isEdit = !!measurement;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<MeasurementEditDTO>({
    defaultValues: {
      value: 0,
      date: '',
      categoryId: measurementCategory?.id,
    },
    mode: 'onChange',
  });

  const { data: categories } = useMeasurementCategories();

  useEffect(() => {
    reset({
      value: measurement?.value ?? 0,
      date: measurement?.date ?? '',
      categoryId: measurement?.categoryId ?? measurementCategory?.id,
    });
  }, [measurement, reset]);

  const handleValidSubmit = async (data: MeasurementEditDTO) => {
    if (!isValid || loading) return;

    try {
      await onSubmit(
        {
          value: Number(data.value),
          date: data.date,
          categoryId: Number(data.categoryId),
        },
        measurement?.id,
      );

      onClose();
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  return (
    <>
      <EditDialog
        open={open}
        title={isEdit ? 'Edit Measurement' : 'Create Measurement'}
        isEdit={isEdit}
        isValid={isValid}
        onClose={onClose}
        onSubmit={handleSubmit(handleValidSubmit)}
        loading={loading}
      >
        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}
        >
          <Controller
            name="value"
            control={control}
            rules={{
              required: 'Value is required',
              validate: (v) => !Number.isNaN(Number(v)) || 'Must be a valid number',
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Value"
                required
                fullWidth
                autoFocus
                type="number"
                slotProps={{
                  htmlInput: { step: '0.000001' },
                }}
                disabled={loading}
                error={!!error}
                helperText={error?.message}
                variant="outlined"
                size="small"
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            rules={{ required: 'Date is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                value={field.value ?? ''}
                onChange={field.onChange}
                label="Date"
                required
                fullWidth
                type="date"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                disabled={loading}
                error={!!error}
                helperText={error?.message}
                variant="outlined"
                size="small"
              />
            )}
          />

          <Controller
            name="categoryId"
            control={control}
            rules={{ required: 'Category selection is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                value={field.value ?? ''}
                select
                label="Category"
                required
                fullWidth
                disabled={loading || !!measurementCategory}
                error={!!error}
                helperText={error?.message}
                variant="outlined"
                size="small"
              >
                {categories?.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>
      </EditDialog>
    </>
  );
};
