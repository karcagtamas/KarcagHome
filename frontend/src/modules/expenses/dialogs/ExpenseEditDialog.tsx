import { EditDialog } from '../../../components/dialog/EditDialog';
import { useEffect } from 'react';
import type { ExpenseDTO, ExpenseEditDTO } from '../models/expenses';
import { useExpenseCategories } from '../../../hooks/useExpenseCategories';
import { Box, MenuItem, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  open: boolean;
  expense?: ExpenseDTO | null;
  accountId: number;
  onClose: () => void;
  onSubmit: (data: ExpenseEditDTO, id?: number) => Promise<void>;
  loading?: boolean;
};

export const ExpenseEditDialog: React.FC<Props> = ({ open, expense, accountId, onClose, onSubmit, loading }) => {
  const isEdit = !!expense;
  const { data: categories } = useExpenseCategories();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ExpenseEditDTO>({
    defaultValues: {
      amount: 0,
      description: null,
      date: '',
      categoryId: undefined,
      accountId: accountId,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    reset({
      amount: expense?.amount ?? 0,
      description: expense?.description ?? null,
      date: expense?.date ?? '',
      categoryId: expense?.category.id,
      accountId: accountId,
    });
  }, [expense, accountId, reset]);

  const handleValidSubmit = async (data: ExpenseEditDTO) => {
    if (!isValid || loading) return;

    try {
      await onSubmit(
        {
          amount: Number(data.amount),
          description: data.description || null,
          date: data.date,
          categoryId: Number(data.categoryId),
          accountId: accountId,
        },
        expense?.id,
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
        title={isEdit ? 'Edit Expense' : 'Create Expense'}
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
            name="amount"
            control={control}
            rules={{
              required: 'Amount is required',
              validate: (v) => !Number.isNaN(Number(v)) || 'Must be a valid number',
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Amount"
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
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value || null)}
                label="Description"
                fullWidth
                multiline
                rows={3}
                disabled={loading}
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
                value={field.value ?? ''} // Holds the raw YYYY-MM-DD picker value cleanly
                onChange={field.onChange} // Passes raw picker selection directly without processing delays
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
                disabled={loading}
                error={!!error}
                helperText={error?.message}
                variant="outlined"
                size="small"
              >
                {categories?.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name} ({d.type.name})
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
