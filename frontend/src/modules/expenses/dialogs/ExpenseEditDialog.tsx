import { Field, Input, Textarea } from '@fluentui/react-components';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { useEffect, useState } from 'react';
import { ComboBox } from '../../../components/common/ComboBox';
import type { ExpenseDTO, ExpenseEditDTO } from '../models/expenses';
import { useExpenseCategories } from '../../../hooks/useExpenseCategories';
import { DatePicker } from '@fluentui/react-datepicker-compat';

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
  const categories = useExpenseCategories();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState<Date | null>(null);
  const [categoryId, setCategoryId] = useState<number>();

  useEffect(() => {
    if (open) {
      setAmount(expense?.amount.toString() ?? '');
      setDescription(expense?.description);
      setDate(expense?.date ?? new Date());
      setCategoryId(expense?.category.id);
    }
  }, [expense, open]);

  const parsedAmountValue = Number(amount);
  const isValid = !!date && !!categoryId && !Number.isNaN(parsedAmountValue);

  const handleSubmit = async () => {
    if (!isValid || loading) return;

    try {
      await onSubmit({
        amount: parsedAmountValue,
        description,
        date,
        categoryId,
        accountId,
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
        title={isEdit ? 'Edit Expense' : 'Create Expense'}
        isEdit={isEdit}
        isValid={isValid}
        onClose={onClose}
        onSubmit={handleSubmit}
        loading={loading}
      >
        <Field label="Amount" required>
          <Input
            autoFocus
            type="number"
            step="0.000001"
            value={amount}
            onChange={(_, data) => setAmount(data.value)}
            disabled={loading}
          />
        </Field>

        <Field label="Description" required>
          <Textarea value={description} onChange={(_, d) => setDescription(d.value)} disabled={loading} />
        </Field>

        <Field label="Date" required>
          <DatePicker value={date} onSelectDate={(d) => setDate(d ?? null)} disabled={loading} />
        </Field>

        <Field label="Categories" required>
          <ComboBox
            data={categories}
            value={categoryId?.toString()}
            identifierProvider={(d) => d.id.toString()}
            displayTextProvider={(d) => `${d.name} (${d.type.name})`}
            onValueChange={(v) => setCategoryId(Number(v))}
            disabled={loading}
          />
        </Field>
      </EditDialog>
    </>
  );
};
