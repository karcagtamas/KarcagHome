import { useEffect, useState } from 'react';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { useExpenseCategoryTypes } from '../../../hooks/useExpenseCategoryTypes';
import type { ExpenseCategoryDTO, ExpenseCategoryEditDTO } from '../models/expenses';
import { ColorPickerPopup } from '../../../components/common/ColorPickerPopup';
import { Box, MenuItem, TextField } from '@mui/material';

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

  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [typeId, setTypeId] = useState<number>();

  useEffect(() => {
    if (open) {
      setName(expenseCategory?.name ?? '');
      setColor(expenseCategory?.color ?? '');
      setTypeId(expenseCategory?.type.id);
    }
  }, [expenseCategory, open]);

  const isValid = name.trim().length > 0 && color.trim().length > 0 && !!typeId;

  const handleSubmit = async () => {
    if (!isValid || loading) return;

    try {
      await onSubmit(
        {
          name,
          color,
          typeId,
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
        onSubmit={handleSubmit}
        loading={loading}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          <TextField
            label="Name"
            required
            fullWidth
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            variant="outlined"
            size="small"
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box component="span" sx={{ fontSize: '0.85rem', fontWeight: 500, color: 'text.secondary' }}>
              Color *
            </Box>
            <ColorPickerPopup color={color} onColorChange={(d) => setColor(d)} />
          </Box>

          <TextField
            select
            label="Type"
            required
            fullWidth
            value={typeId}
            onChange={(e) => setTypeId(Number(e.target.value))}
            disabled={loading}
            variant="outlined"
            size="small"
          >
            {types?.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </EditDialog>
    </>
  );
};
