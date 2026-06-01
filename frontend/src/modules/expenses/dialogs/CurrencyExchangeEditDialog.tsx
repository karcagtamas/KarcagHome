import { Field, makeStyles, tokens, Input } from '@fluentui/react-components';
import type { CurrencyExchangeDTO } from '../models/currency';
import type React from 'react';
import { useEffect, useState } from 'react';
import { MONTHS } from '../../../common/month';
import { useCurrencies } from '../../../hooks/useCurrencies';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { ComboBox } from '../../../components/common/ComboBox';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
    minWidth: '420px',
  },
});

type Props = {
  open: boolean;
  exchange?: CurrencyExchangeDTO | null;
  year: number;
  loading?: boolean;

  defaultCurrencyFromId?: number;
  defaultMonth?: number;

  onClose: () => void;
  onSubmit: (data: CurrencyExchangeDTO) => Promise<void>;
};

export const CurrencyExchangeEditDialog: React.FC<Props> = ({
  open,
  exchange,
  year,
  loading = false,
  defaultCurrencyFromId,
  defaultMonth,
  onClose,
  onSubmit,
}) => {
  const styles = useStyles();

  const isEdit = !!exchange;
  const currencies = useCurrencies();

  const [currencyFromId, setCurrencyFromId] = useState<number>();
  const [currencyToId, setCurrencyToId] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!open) return;

    setCurrencyFromId(exchange?.currencyFromId ?? defaultCurrencyFromId);
    setCurrencyToId(exchange?.currencyToId);
    setMonth(exchange?.month ?? defaultMonth);
    setValue(exchange?.value?.toString() ?? '');
  }, [exchange, open, defaultCurrencyFromId, defaultMonth]);

  const parsedValue = Number(value);
  const isValid =
    !!currencyFromId &&
    !!currencyToId &&
    !!month &&
    !Number.isNaN(parsedValue) &&
    parsedValue > 0 &&
    currencyFromId !== currencyToId;

  const handleSubmit = async () => {
    if (!isValid || loading) {
      return;
    }

    await onSubmit({
      currencyFromId,
      currencyToId,
      year,
      month,
      value: parsedValue,
    });

    onClose();
  };

  return (
    <EditDialog
      open={open}
      title={isEdit ? 'Edit Exchange Rate' : 'Add Exchange Rate'}
      isEdit={isEdit}
      isValid={isValid}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <div className={styles.content}>
        <Field label="From Currency" required>
          <ComboBox
            data={currencies}
            value={currencyFromId?.toString()}
            identifierProvider={(d) => d.id.toString()}
            displayTextProvider={(d) => `${d.name} [${d.abbreviation}]`}
            optionFilter={(d) => d.id !== currencyToId}
            onValueChange={(v) => setCurrencyFromId(Number(v))}
            disabled={loading || isEdit}
          />
        </Field>

        <Field label="To Currency" required>
          <ComboBox
            data={currencies}
            value={currencyToId?.toString()}
            identifierProvider={(d) => d.id.toString()}
            displayTextProvider={(d) => `${d.name} [${d.abbreviation}]`}
            optionFilter={(d) => d.id !== currencyFromId}
            onValueChange={(v) => setCurrencyToId(Number(v))}
            disabled={loading || isEdit}
          />
        </Field>

        <Field label="Month" required>
          <ComboBox
            data={Object.values(MONTHS)}
            value={month?.toString()}
            identifierProvider={(d) => d.value.toString()}
            displayTextProvider={(d) => d.displayText}
            onValueChange={(v) => setMonth(Number(v))}
            disabled={loading || isEdit}
          />
        </Field>

        <Field label={`Exchange Value (${year})`} required>
          <Input
            type="number"
            step="0.000001"
            value={value}
            onChange={(_, data) => setValue(data.value)}
            disabled={loading}
          />
        </Field>
      </div>
    </EditDialog>
  );
};
