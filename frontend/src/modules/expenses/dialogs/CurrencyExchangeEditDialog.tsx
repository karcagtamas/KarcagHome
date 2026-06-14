import type { CurrencyExchangeDTO } from '../models/currency';
import type React from 'react';
import { useEffect, useState } from 'react';
import { MONTHS } from '../../../common/month';
import { useCurrencies } from '../../../hooks/useCurrencies';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { Box, MenuItem, TextField } from '@mui/material';

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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          pt: 1,
          minWidth: { xs: '100%', sm: '420px' },
        }}
      >
        <TextField
          select
          label="From Currency"
          required
          fullWidth
          value={currencyFromId}
          onChange={(e) => setCurrencyFromId(Number(e.target.value))}
          disabled={loading || isEdit}
          variant="outlined"
          size="small"
        >
          {currencies
            ?.filter((d) => d.id !== currencyToId) // Filters out target selection directly
            .map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.name} [{d.abbreviation}]
              </MenuItem>
            ))}
        </TextField>

        <TextField
          select
          label="To Currency"
          required
          fullWidth
          value={currencyToId}
          onChange={(e) => setCurrencyToId(Number(e.target.value))}
          disabled={loading || isEdit}
          variant="outlined"
          size="small"
        >
          {currencies
            ?.filter((d) => d.id !== currencyFromId) // Filters out origin selection directly
            .map((d) => (
              <MenuItem key={d.id} value={d.id}>
                {d.name} [{d.abbreviation}]
              </MenuItem>
            ))}
        </TextField>

        <TextField
          select
          label="Month"
          required
          fullWidth
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          disabled={loading || isEdit}
          variant="outlined"
          size="small"
        >
          {Object.values(MONTHS).map((d) => (
            <MenuItem key={d.value} value={d.value}>
              {d.displayText}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label={`Exchange Value (${year})`}
          required
          fullWidth
          type="number"
          slotProps={{
            htmlInput: { step: '0.000001' },
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          variant="outlined"
          size="small"
        />
      </Box>
    </EditDialog>
  );
};
