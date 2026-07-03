import { useEffect } from 'react';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { useExpenseCategoryTypes } from '../hooks/useExpenseCategoryTypes';
import type { ExpenseCategoryDTO, ExpenseCategoryEditDTO } from '../models/expenses';
import { ColorPickerPopup } from '../../../components/common/ColorPickerPopup';
import { Box, FormHelperText, MenuItem, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  open: boolean;
  expenseCategory: ExpenseCategoryDTO | null;
  onClose: () => void;
  onSubmit: (data: ExpenseCategoryEditDTO, id?: number) => Promise<void>;
  loading?: boolean;
};

export const ExpenseCategoryEditDialog: React.FC<Props> = ({ open, expenseCategory, onClose, onSubmit, loading }) => {
  const isEdit = !!expenseCategory;
  const { data: types } = useExpenseCategoryTypes();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ExpenseCategoryEditDTO>({
    defaultValues: {
      name: '',
      color: '',
      typeId: undefined,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    reset({
      name: expenseCategory?.name ?? '',
      color: expenseCategory?.color ?? '',
      typeId: expenseCategory?.type.id,
    });
  }, [expenseCategory, reset]);

  const handleValidSubmit = async (data: ExpenseCategoryEditDTO) => {
    if (!isValid || loading) return;

    try {
      await onSubmit(
        {
          name: data.name,
          color: data.color,
          typeId: Number(data.typeId),
        },
        expenseCategory?.id,
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
        title={isEdit ? 'Edit Expense Category' : 'Create Expense Category'}
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
            name="typeId"
            control={control}
            rules={{ required: 'Category type is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                value={field.value ?? ''}
                select
                label="Type"
                required
                fullWidth
                disabled={loading}
                error={!!error}
                helperText={error?.message}
                variant="outlined"
                size="small"
              >
                {types?.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
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
