import { useEffect, useState } from 'react';
import type { CurrencyDTO } from '../models/currency';
import { Field, Input, Label, makeStyles, MessageBar, Switch, tokens } from '@fluentui/react-components';
import { ConfirmDialog } from '../../../components/dialog/ConfirmDialog';
import { EditDialog } from '../../../components/dialog/EditDialog';

const useStyles = makeStyles({
  switchRow: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalM,
  },
});

type Props = {
  open: boolean;
  currency?: CurrencyDTO | null;
  onClose: () => void;
  onSubmit: (data: Omit<CurrencyDTO, 'id'>, id?: number) => Promise<void>;
  loading?: boolean;
};

export const CurrencyEditDialog: React.FC<Props> = ({ open, currency, onClose, onSubmit, loading }) => {
  const styles = useStyles();

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
        <Field label="Name" required>
          <Input
            autoFocus
            value={name}
            onChange={(_, d) => setName(d.value)}
            disabled={loading}
            placeholder="e.g. Euro"
          />
        </Field>

        <Field label="Abbreviation" required>
          <Input
            value={abbreviation}
            onChange={(_, d) => setAbbreviation(d.value)}
            disabled={loading}
            placeholder="e.g. EUR"
          />
        </Field>

        {isEdit ? (
          <div className={styles.switchRow}>
            <Label htmlFor="currency-disabled">Disabled</Label>

            <Switch
              id="currency-disabled"
              checked={disabled}
              onChange={(_, data) => handleDisabledChange(data.checked)}
              disabled={loading}
            />
          </div>
        ) : (
          <></>
        )}

        {disabled && (
          <MessageBar intent="warning">
            Disabled currencies will be hidden from exchange lists unless "Show Disabled" is enabled.
          </MessageBar>
        )}
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
