import { useEffect } from 'react';
import type { MeasurementCategoryDTO, MeasurementCategoryEditDTO } from '../models/measurement';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { Box, FormHelperText, TextField } from '@mui/material';
import { ColorPickerPopup } from '../../../components/common/ColorPickerPopup';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  open: boolean;
  measurementCategory: MeasurementCategoryDTO | null;
  onClose: () => void;
  onSubmit: (data: MeasurementCategoryEditDTO, id?: number) => Promise<void>;
  loading?: boolean;
};

export const MeasurementCategoryEditDialog: React.FC<Props> = ({
  open,
  measurementCategory,
  onClose,
  onSubmit,
  loading,
}) => {
  const isEdit = !!measurementCategory;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<MeasurementCategoryEditDTO>({
    defaultValues: {
      name: '',
      color: '',
      unit: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    reset({
      name: measurementCategory?.name ?? '',
      color: measurementCategory?.color ?? '',
      unit: measurementCategory?.unit ?? '',
    });
  }, [measurementCategory, reset]);

  const handleValidSubmit = async (data: MeasurementCategoryEditDTO) => {
    if (!isValid || loading) return;

    try {
      await onSubmit(
        {
          name: data.name.trim(),
          color: data.color.trim(),
          unit: data.unit.trim(),
        },
        measurementCategory?.id,
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
        title={isEdit ? 'Edit Measurement Category' : 'Create Measurement Category'}
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
            name="name"
            control={control}
            rules={{ required: 'Name is required', validate: (v) => !!v?.trim() || 'Cannot be empty spaces' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Name"
                required
                fullWidth
                autoFocus
                disabled={loading}
                error={!!error}
                helperText={error?.message}
                variant="outlined"
                size="small"
              />
            )}
          />

          <Controller
            name="color"
            control={control}
            rules={{ required: 'Color selection is required' }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box
                  component="span"
                  sx={{ fontSize: '0.85rem', fontWeight: 500, color: error ? 'error.main' : 'text.secondary' }}
                >
                  Color *
                </Box>
                <ColorPickerPopup color={value} onColorChange={onChange} />
                {error && <FormHelperText error>{error.message}</FormHelperText>}
              </Box>
            )}
          />

          <Controller
            name="unit"
            control={control}
            rules={{
              required: 'Unit measurement is required',
              validate: (v) => !!v?.trim() || 'Cannot be empty spaces',
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Unit"
                required
                fullWidth
                disabled={loading}
                error={!!error}
                helperText={error?.message}
                variant="outlined"
                size="small"
              />
            )}
          />
        </Box>
      </EditDialog>
    </>
  );
};
