import type { AccountDTO, AccountEditDTO } from '../models/account';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { useEffect, useState } from 'react';
import { useCurrencies } from '../../../hooks/useCurrencies';
import { Box, MenuItem, TextField } from '@mui/material';

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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          <TextField
            label="Name"
            required
            fullWidth
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            placeholder="My private account"
            variant="outlined"
            size="small"
          />

          <TextField
            select
            label="Currency"
            required
            fullWidth
            value={currencyId}
            onChange={(e) => setCurrencyId(Number(e.target.value))}
            disabled={loading || isEdit}
            variant="outlined"
            size="small"
          >
            {currencies?.map((currency) => (
              <MenuItem key={currency.id} value={currency.id}>
                {currency.name} [{currency.abbreviation}]
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Base Value"
            required
            fullWidth
            type="number"
            slotProps={{
              htmlInput: { step: '0.000001' },
            }}
            value={baseValue}
            onChange={(e) => setBaseValue(e.target.value)}
            disabled={loading}
            variant="outlined"
            size="small"
          />
        </Box>
      </EditDialog>
    </>
  );
};
