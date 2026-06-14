import { AppDialog } from './AppDialog';
import { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { LoadingButton } from '../common/LoadingButton';

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
  const [checkboxConfirmed, setCheckboxConfirmed] = useState<boolean>(false);

  const isRequirementMet = !checkbox || checkboxConfirmed;

  const handleConfirm = async () => {
    if (loading || !isRequirementMet) return;
    await onConfirm();
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <AppDialog
      open={open}
      onClose={handleClose}
      title={title}
      footer={
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: checkbox ? 'space-between' : 'flex-end',
            gap: 1,
          }}
        >
          {checkbox && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxConfirmed}
                  onChange={(e) => setCheckboxConfirmed(e.target.checked)}
                  color={danger ? 'error' : 'primary'}
                />
              }
              label="Are you sure want to confirm it?"
            />
          )}

          <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
            <Button variant="text" onClick={onClose} disabled={loading}>
              {cancelText}
            </Button>

            <LoadingButton
              variant={danger ? 'contained' : 'outlined'}
              color={danger ? 'error' : 'primary'}
              onClick={handleConfirm}
              disabled={loading || !isRequirementMet}
            >
              {confirmText}
            </LoadingButton>
          </Box>
        </Box>
      }
    >
      {message}
    </AppDialog>
  );
};
