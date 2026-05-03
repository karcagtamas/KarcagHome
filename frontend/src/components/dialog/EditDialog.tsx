import { Button } from '@fluentui/react-components';
import { AppDialog } from './AppDialog';
import { LoadingButton } from '../common/LoadingButton';

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

  return (
    <>
      <AppDialog
        open={open}
        onOpenChange={(o) => !o && !loading && onClose()}
        title={title}
        footer={
          <>
            <Button appearance="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <LoadingButton
              appearance="primary"
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
