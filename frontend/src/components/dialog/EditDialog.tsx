import { AppDialog } from './AppDialog';
import { LoadingButton } from '../common/LoadingButton';
import { Button } from '@mui/material';

type Props = {
  open: boolean;
  title: string;
  isEdit: boolean;
  isValid: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  loading?: boolean;
  children?: React.ReactNode;
};

export const EditDialog: React.FC<Props> = ({ open, title, isEdit, isValid, onClose, onSubmit, loading, children }) => {
  const handleSubmit = async () => {
    if (!isValid || loading) return;

    try {
      await onSubmit();

      onClose();
    } catch (err) {
      console.error('Save failed', err);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <>
      <AppDialog
        open={open}
        onClose={handleClose}
        title={title}
        footer={
          <>
            <Button variant="text" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <LoadingButton
              variant="contained"
              onClick={handleSubmit}
              disabled={!isValid || loading}
              isLoading={loading}
            >
              {isEdit ? 'Save' : 'Create'}
            </LoadingButton>
          </>
        }
      >
        {children}
      </AppDialog>
    </>
  );
};
