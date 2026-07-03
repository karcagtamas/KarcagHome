import type { AccountDTO, AccountEditDTO } from '../models/account';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { useEffect } from 'react';
import { useCurrencies } from '../../../hooks/useCurrencies';
import { Box, MenuItem, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

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

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<AccountEditDTO>({
    defaultValues: {
      name: '',
      currencyId: undefined,
      baseValue: 0,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    reset({
      name: account?.name ?? '',
      currencyId: account?.currency.id,
      baseValue: account?.baseValue ?? 0,
    });
  }, [account, reset]);

  const handleValidSubmit = async (data: AccountEditDTO) => {
    if (!isValid || loading) return;

    try {
      await onSubmit({
        name: data.name,
        currencyId: Number(data.currencyId),
        baseValue: Number(data.baseValue),
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
        onSubmit={handleSubmit(handleValidSubmit)}
        loading={loading}
      >
        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required', validate: (v) => !!v?.trim() || 'Cannot be empty spaces' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Name"
                required
                fullWidth
                autoFocus
                disabled={loading}
                placeholder="My private account"
                error={!!error}
                helperText={error?.message}
                variant="outlined"
                size="small"
              />
            )}
          />

          <Controller
            name="currencyId"
            control={control}
            rules={{ required: 'Currency is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                value={field.value ?? ''}
                select
                label="Currency"
                required
                fullWidth
                disabled={loading || isEdit}
                error={!!error}
                helperText={error?.message}
                variant="outlined"
                size="small"
              >
                {currencies?.map((currency) => (
                  <MenuItem key={currency.id} value={currency.id}>
                    {currency.name} [{currency.abbreviation}]
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="baseValue"
            control={control}
            rules={{
              required: 'Base value is required',
              min: { value: 0, message: 'Base value must be greater than or equal to 0' },
              validate: (v) => !Number.isNaN(Number(v)) || 'Must be a valid number',
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Base Value"
                required
                fullWidth
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
        </Box>
      </EditDialog>
    </>
  );
};
