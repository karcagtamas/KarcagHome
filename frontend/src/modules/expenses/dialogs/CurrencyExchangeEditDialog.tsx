import type { CurrencyExchangeDTO } from '../models/currency';
import type React from 'react';
import { useEffect, useMemo } from 'react';
import { MONTHS } from '../../../common/month';
import { useCurrencies } from '../hooks/useCurrencies';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { Box, MenuItem, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useExchangeAvailableMonths } from '../hooks/useExchangeAvailableMonths';

type Props = {
  open: boolean;
  exchange?: CurrencyExchangeDTO | null;
  year: number;
  loading?: boolean;

  defaultCurrencyFromId?: number;

  onClose: () => void;
  onSubmit: (data: CurrencyExchangeDTO) => Promise<void>;
};

export const CurrencyExchangeEditDialog: React.FC<Props> = ({
  open,
  exchange,
  year,
  loading = false,
  defaultCurrencyFromId,
  onClose,
  onSubmit,
}) => {
  const isEdit = !!exchange;
  const currencies = useCurrencies();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = useForm<CurrencyExchangeDTO>({
    defaultValues: {
      currencyFromId: undefined,
      currencyToId: undefined,
      month: undefined,
      year: year,
      value: 0,
    },
    mode: 'onChange',
  });

  const watchedFromId = watch('currencyFromId');
  const watchedToId = watch('currencyToId');
  const watchedMonth = watch('month');

  const availableMonths = useExchangeAvailableMonths(watchedFromId, watchedToId, year);
  const months = useMemo(() => {
    if (isEdit && Boolean(watchedMonth)) {
      return [watchedMonth, ...availableMonths];
    } else {
      return availableMonths;
    }
  }, [availableMonths, isEdit, watchedMonth]);

  useEffect(() => {
    reset({
      currencyFromId: exchange?.currencyFromId ?? defaultCurrencyFromId,
      currencyToId: exchange?.currencyToId,
      month: exchange?.month,
      year: exchange?.year ?? year,
      value: exchange?.value ?? 0,
    });
  }, [exchange, defaultCurrencyFromId, year, reset]);

  const handleValidSubmit = async (data: CurrencyExchangeDTO) => {
    if (!isValid || loading) return;

    try {
      await onSubmit({
        currencyFromId: Number(data.currencyFromId),
        currencyToId: Number(data.currencyToId),
        month: Number(data.month),
        year: year,
        value: Number(data.value),
      });

      onClose();
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  return (
    <EditDialog
      open={open}
      title={isEdit ? 'Edit Exchange Rate' : 'Add Exchange Rate'}
      isEdit={isEdit}
      isValid={isValid}
      onClose={onClose}
      onSubmit={handleSubmit(handleValidSubmit)}
      loading={loading}
    >
      <Box
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          pt: 1,
          minWidth: { xs: '100%', sm: '420px' },
        }}
      >
        <Controller
          name="currencyFromId"
          control={control}
          rules={{
            required: 'Origin currency is required',
            validate: (v) => v !== watchedToId || 'Currencies cannot match',
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              value={field.value ?? ''}
              select
              label="From Currency"
              required
              fullWidth
              disabled={loading || isEdit || !!defaultCurrencyFromId}
              error={!!error}
              helperText={error?.message}
              variant="outlined"
              size="small"
            >
              {currencies
                ?.filter((d) => d.id !== watchedToId)
                .map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name} [{d.abbreviation}]
                  </MenuItem>
                ))}
            </TextField>
          )}
        />

        <Controller
          name="currencyToId"
          control={control}
          rules={{
            required: 'Target currency is required',
            validate: (v) => v !== watchedFromId || 'Currencies cannot match',
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              value={field.value ?? ''}
              select
              label="To Currency"
              required
              fullWidth
              disabled={loading || isEdit}
              error={!!error}
              helperText={error?.message}
              variant="outlined"
              size="small"
            >
              {currencies
                ?.filter((d) => d.id !== watchedFromId)
                .map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name} [{d.abbreviation}]
                  </MenuItem>
                ))}
            </TextField>
          )}
        />

        <Controller
          name="month"
          control={control}
          rules={{ required: 'Month selection is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              value={field.value ?? ''}
              select
              label="Month"
              required
              fullWidth
              disabled={loading || isEdit || !watchedToId}
              error={!!error}
              helperText={error?.message}
              variant="outlined"
              size="small"
            >
              {Object.values(MONTHS)
                .filter((d) => months.includes(d.value))
                .map((d) => (
                  <MenuItem key={d.value} value={d.value}>
                    {d.displayText}
                  </MenuItem>
                ))}
            </TextField>
          )}
        />

        <Controller
          name="value"
          control={control}
          rules={{
            required: 'Exchange value is required',
            min: { value: 0.000001, message: 'Value must be greater than 0' },
            validate: (v) => !Number.isNaN(Number(v)) || 'Must be a valid number',
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label={`Exchange Value (${year})`}
              required
              fullWidth
              type="number"
              slotProps={{
                htmlInput: { step: '0.000001' },
              }}
              disabled={loading || !watchedToId}
              error={!!error}
              helperText={error?.message}
              variant="outlined"
              size="small"
            />
          )}
        />
      </Box>
    </EditDialog>
  );
};
