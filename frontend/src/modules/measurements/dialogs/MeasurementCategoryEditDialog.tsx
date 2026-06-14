import { useEffect, useState } from 'react';
import type { MeasurementCategoryDTO, MeasurementCategoryEditDTO } from '../models/measurement';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { Box, TextField } from '@mui/material';
import { ColorPickerPopup } from '../../../components/common/ColorPickerPopup';

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

  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [unit, setUnit] = useState('');

  useEffect(() => {
    if (open) {
      setName(measurementCategory?.name ?? '');
      setColor(measurementCategory?.color ?? '');
      setUnit(measurementCategory?.unit ?? '');
    }
  }, [measurementCategory, open]);

  const isValid = name.trim().length > 0 && color.trim().length > 0 && unit.trim().length > 0;

  const handleSubmit = async () => {
    if (!isValid || loading) return;

    try {
      await onSubmit(
        {
          name,
          color,
          unit,
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
            label="Unit"
            required
            fullWidth
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            disabled={loading}
            variant="outlined"
            size="small"
          />
        </Box>
      </EditDialog>
    </>
  );
};
