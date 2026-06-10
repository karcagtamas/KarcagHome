import { useEffect, useState } from 'react';
import type { CurrencyDTO } from '../models/currency';
import { ConfirmDialog } from '../../../components/dialog/ConfirmDialog';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { Alert, Box, FormControlLabel, Switch, TextField } from '@mui/material';

type Props = {
  open: boolean;
  currency?: CurrencyDTO | null;
  onClose: () => void;
  onSubmit: (data: Omit<CurrencyDTO, 'id'>, id?: number) => Promise<void>;
  loading?: boolean;
};

export const CurrencyEditDialog: React.FC<Props> = ({ open, currency, onClose, onSubmit, loading }) => {
  const isEdit = !!currency;

  const [name, setName] = useState('');
  const [abbreviation, setAbbreviation] = useState('');
  const [disabled, setDisabled] = useState(false);

  const [confirmDisableOpen, setConfirmDisableOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setName(currency?.name ?? '');
      setAbbreviation(currency?.abbreviation ?? '');
      setDisabled(currency?.disabled ?? false);
    }
  }, [currency, open]);

  const isValid = name.trim().length > 0 && abbreviation.trim().length > 0;

  const handleSubmit = async () => {
    if (!isValid || loading) return;

    try {
      await onSubmit({ name: name.trim(), abbreviation: abbreviation.trim().toUpperCase(), disabled }, currency?.id);

      onClose();
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  const handleDisabledChange = (checked: boolean) => {
    if (!checked) {
      setDisabled(false);
      return;
    }

    if (disabled) {
      return;
    }

    setConfirmDisableOpen(true);
  };

  return (
    <>
      <EditDialog
        open={open}
        title={isEdit ? 'Edit Currency' : 'Create Currency'}
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
            placeholder="e.g. Euro"
            variant="outlined"
            size="small"
          />

          <TextField
            label="Abbreviation"
            required
            fullWidth
            value={abbreviation}
            onChange={(e) => setAbbreviation(e.target.value)}
            disabled={loading}
            placeholder="e.g. EUR"
            variant="outlined"
            size="small"
          />

          {isEdit && (
            <Box sx={{ mt: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    id="currency-disabled"
                    checked={disabled}
                    onChange={(e) => handleDisabledChange(e.target.checked)}
                    disabled={loading}
                  />
                }
                label="Disabled"
              />
            </Box>
          )}

          {disabled && (
            <Alert severity="warning" sx={{ mt: 1 }}>
              Disabled currencies will be hidden from exchange lists unless "Show Disabled" is enabled.
            </Alert>
          )}
        </Box>
      </EditDialog>
      <ConfirmDialog
        open={confirmDisableOpen}
        title="Disable Currency"
        message={
          <>
            Are you sure you want to disable <strong>{name}</strong>?{' '}
          </>
        }
        confirmText="Disable"
        danger
        onClose={() => setConfirmDisableOpen(false)}
        onConfirm={async () => {
          setDisabled(true);
          setConfirmDisableOpen(false);
        }}
      ></ConfirmDialog>
    </>
  );
};
