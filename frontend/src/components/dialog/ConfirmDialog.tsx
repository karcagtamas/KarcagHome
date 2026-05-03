import { Button, Checkbox, Spinner, type CheckboxProps } from '@fluentui/react-components';
import { AppDialog } from './AppDialog';
import { useState } from 'react';

type Props = {
  open: boolean;
  title: string;
  message: React.ReactNode;

  confirmText?: string;
  cancelText?: string;

  danger?: boolean;
  checkbox?: boolean;
  loading?: boolean;

  onConfirm: () => Promise<void> | void;
  onClose: () => void;
};

export const ConfirmDialog: React.FC<Props> = ({
  open,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = false,
  checkbox = false,
  loading = false,
  onConfirm,
  onClose,
}) => {
  const [checkboxConfirmed, setCheckboxConfirmed] = useState<CheckboxProps["checked"]>(false);

  const isCheckboxConfirmed = checkbox && checkboxConfirmed === true;

  const handleConfirm = async () => {
    if (loading) return;
    await onConfirm();
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={(o) => !o && !loading && isCheckboxConfirmed && onClose()}
      footer={
        <>
          {checkbox ? (
            <Checkbox
              checked={checkboxConfirmed}
              onChange={(_, data) => setCheckboxConfirmed(data.checked)}
              label="Are you sure want to confirm it?"
              labelPosition='after'
            />
          ) : (
            <></>
          )}
          <Button appearance="secondary" onClick={onClose} disabled={loading && !isCheckboxConfirmed}>
            {cancelText}
          </Button>

          <Button
            appearance={danger ? 'primary' : 'secondary'}
            onClick={handleConfirm}
            disabled={loading && !isCheckboxConfirmed}
          >
            {loading ? <Spinner size="tiny" /> : confirmText}
          </Button>
        </>
      }
      title={title}
    >
      {message}
    </AppDialog>
  );
};
