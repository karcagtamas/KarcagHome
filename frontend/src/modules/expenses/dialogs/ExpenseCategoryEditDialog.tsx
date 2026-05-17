import { useEffect, useState } from 'react';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { useExpenseCategoryTypes } from '../../../hooks/useExpenseCategoryTypes';
import type { ExpenseCategoryDTO, ExpenseCategoryEditDTO } from '../models/expenses';
import { Field, Input } from '@fluentui/react-components';
import { ComboBox } from '../../../components/common/ComboBox';
import { ColorPickerPopup } from '../../../components/common/ColorPickerPopup';

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
      await onSubmit({
        name,
        color,
        typeId,
      });

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
        <Field label="Name" required>
          <Input autoFocus value={name} onChange={(_, d) => setName(d.value)} disabled={loading} />
        </Field>

        <Field label="Color" required>
          <ColorPickerPopup color={color} onColorChange={(d) => setColor(d)} />
        </Field>

        <Field label="Type" required>
          <ComboBox
            data={types ?? []}
            value={typeId?.toString()}
            identifierProvider={(d) => d.id.toString()}
            displayTextProvider={(d) => d.name}
            onValueChange={(v) => setTypeId(Number(v))}
            disabled={loading}
          />
        </Field>
      </EditDialog>
    </>
  );
};
