import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Spinner,
} from "@fluentui/react-components";

type Props = {
  open: boolean;
  title: string;
  message: React.ReactNode;

  confirmText?: string;
  cancelText?: string;

  danger?: boolean;
  loading?: boolean;

  onConfirm: () => Promise<void> | void;
  onClose: () => void;
};

export const ConfirmDialog: React.FC<Props> = ({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
  loading = false,
  onConfirm,
  onClose,
}) => {
  const handleConfirm = async () => {
    if (loading) return;
    await onConfirm();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open && !loading) {
          onClose();
        }
      }}
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{title}</DialogTitle>

          <DialogContent>{message}</DialogContent>

          <DialogActions>
            <Button appearance="secondary" onClick={onClose} disabled={loading}>
              {cancelText}
            </Button>

            <Button appearance={danger ? "primary" : "secondary"} onClick={handleConfirm} disabled={loading}>
              {loading ? <Spinner size="tiny" /> : confirmText}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
