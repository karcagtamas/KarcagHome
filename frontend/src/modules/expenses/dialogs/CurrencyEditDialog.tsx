import { useEffect, useState } from 'react';
import type { CurrencyDTO } from '../models/currency';
import { ConfirmDialog } from '../../../components/dialog/ConfirmDialog';
import { EditDialog } from '../../../components/dialog/EditDialog';
import { Alert, Box, FormControlLabel, Switch, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  open: boolean;
  currency?: CurrencyDTO | null;
  onClose: () => void;
  onSubmit: (data: Omit<CurrencyDTO, 'id'>, id?: number) => Promise<void>;
  loading?: boolean;
};

type FormValues = Omit<CurrencyDTO, 'id'>;

export const CurrencyEditDialog: React.FC<Props> = ({ open, currency, onClose, onSubmit, loading }) => {
  const isEdit = !!currency;
  const [confirmDisableOpen, setConfirmDisableOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      abbreviation: '',
      disabled: false,
    },
    mode: 'onChange',
  });

  const formName = watch('name');
  const isDisabled = watch('disabled');

  useEffect(() => {
    reset({
      name: currency?.name ?? '',
      abbreviation: currency?.abbreviation ?? '',
      disabled: currency?.disabled ?? false,
    });
  }, [currency, reset]);

  const handleValidSubmit = async (data: FormValues) => {
    if (!isValid || loading) return;

    try {
      await onSubmit(
        {
          name: data.name.trim(),
          abbreviation: data.abbreviation.trim().toUpperCase(),
          disabled: data.disabled,
        },
        currency?.id,
      );

      onClose();
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  const handleDisabledToggle = (checked: boolean) => {
    if (!checked) {
      setValue('disabled', false, { shouldValidate: true, shouldDirty: true });
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
                placeholder="e.g. Euro"
                error={!!error}
                helperText={error?.message}
                variant="outlined"
                size="small"
              />
            )}
          />

          <Controller
            name="abbreviation"
            control={control}
            rules={{ required: 'Abbreviation is required', validate: (v) => !!v?.trim() || 'Cannot be empty spaces' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Abbreviation"
                required
                fullWidth
                disabled={loading}
                placeholder="e.g. EUR"
                error={!!error}
                helperText={error?.message}
                variant="outlined"
                size="small"
              />
            )}
          />

          {isEdit && (
            <Box sx={{ mt: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    id="currency-disabled"
                    checked={isDisabled}
                    onChange={(e) => handleDisabledToggle(e.target.checked)}
                    disabled={loading}
                  />
                }
                label="Disabled"
              />
            </Box>
          )}

          {isDisabled && (
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
            Are you sure you want to disable <strong>{formName}</strong>?{' '}
          </>
        }
        confirmText="Disable"
        danger
        onClose={() => setConfirmDisableOpen(false)}
        onConfirm={async () => {
          setValue('disabled', true, { shouldValidate: true, shouldDirty: true });
          setConfirmDisableOpen(false);
        }}
      ></ConfirmDialog>
    </>
  );
};
