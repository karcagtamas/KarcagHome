import { Field, Input } from '@fluentui/react-components';
import type { AccountDTO, AccountEditDTO } from '../models/account';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { useEffect, useState } from 'react';
import { useCurrencies } from '../../../hooks/useCurrencies';
import { ComboBox } from '../../../components/common/ComboBox';

type Props = {
  open: boolean;
  account?: AccountDTO | null;
  onClose: () => void;
  onSubmit: (data: AccountEditDTO, id?: number) => Promise<void>;
  loading?: boolean;
};

export const AccountEditDialog: React.FC<Props> = ({ open, account, onClose, onSubmit, loading }) => {
  const isEdit = !!account;
  const currencies = useCurrencies();

  const [name, setName] = useState('');
  const [currencyId, setCurrencyId] = useState<number>();
  const [baseValue, setBaseValue] = useState('');

  useEffect(() => {
    if (open) {
      setName(account?.name ?? '');
      setCurrencyId(account?.currency.id);
      setBaseValue(account?.baseValue.toString() ?? '');
    }
  }, [account, open]);

  const parsedBaseValue = Number(baseValue);
  const isValid = name.trim().length > 0 && !!currencyId && !Number.isNaN(parsedBaseValue) && parsedBaseValue >= 0;

  const handleSubmit = async () => {
    if (!isValid || loading) return;

    try {
      await onSubmit({
        name,
        currencyId,
        baseValue: parsedBaseValue,
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
        title={isEdit ? 'Edit Account' : 'Create Account'}
        isEdit={isEdit}
        isValid={isValid}
        onClose={onClose}
        onSubmit={handleSubmit}
        loading={loading}
      >
        <Field label="Name" required>
          <Input
            autoFocus
            value={name}
            onChange={(_, d) => setName(d.value)}
            disabled={loading}
            placeholder="My private account"
          />
        </Field>

        <Field label="Currency" required>
          <ComboBox
            data={currencies}
            value={currencyId?.toString()}
            identifierProvider={(d) => d.id.toString()}
            displayTextProvider={(d) => `${d.name} [${d.abbreviation}]`}
            onValueChange={(v) => setCurrencyId(Number(v))}
            disabled={loading || isEdit}
          />
        </Field>

        <Field label="Base Value" required>
          <Input
            type="number"
            step="0.000001"
            value={baseValue}
            onChange={(_, data) => setBaseValue(data.value)}
            disabled={loading}
          />
        </Field>
      </EditDialog>
    </>
  );
};
