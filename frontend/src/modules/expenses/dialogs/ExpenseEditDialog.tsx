import { EditDialog } from '../../../components/dialog/EditDialog';
import { useEffect, useState } from 'react';
import type { ExpenseDTO, ExpenseEditDTO } from '../models/expenses';
import { useExpenseCategories } from '../../../hooks/useExpenseCategories';
import { fromLocalDate, toLocalDate } from '../../../common/helpers';
import { Box, MenuItem, TextField } from '@mui/material';

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

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<number>();

  useEffect(() => {
    if (open) {
      setAmount(expense?.amount.toString() ?? '');
      setDescription(expense?.description ?? null);
      setDate(expense?.date ?? '');
      setCategoryId(expense?.category.id);
    }
  }, [expense, open]);

  const parsedAmountValue = Number(amount);
  const isValid = !!date && !!categoryId && !Number.isNaN(parsedAmountValue);

  const handleSubmit = async () => {
    if (!isValid || loading) return;

    try {
      await onSubmit(
        {
          amount: parsedAmountValue,
          description,
          date,
          categoryId,
          accountId,
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
        onSubmit={handleSubmit}
        loading={loading}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          <TextField
            label="Amount"
            required
            fullWidth
            autoFocus
            type="number"
            slotProps={{
              htmlInput: { step: '0.000001' },
            }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
            variant="outlined"
            size="small"
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description ?? ''}
            onChange={(e) => setDescription(e.target.value || null)}
            disabled={loading}
            variant="outlined"
            size="small"
          />

          <TextField
            label="Date"
            required
            fullWidth
            type="date"
            slotProps={{
              inputLabel: { shrink: true },
            }}
            value={date ? fromLocalDate(date) : undefined}
            onChange={(e) => setDate(e.target.value ? toLocalDate(new Date(e.target.value)) : null)}
            disabled={loading}
            variant="outlined"
            size="small"
          />

          <TextField
            select
            label="Category"
            required
            fullWidth
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            disabled={loading}
            variant="outlined"
            size="small"
          >
            {categories?.map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.name} ({d.type.name})
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </EditDialog>
    </>
  );
};
