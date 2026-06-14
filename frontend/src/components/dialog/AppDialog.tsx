import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;

  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

export const AppDialog: React.FC<Props> = ({ open, onClose, title, children, footer }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {title && <DialogTitle sx={{ fontWeight: 600 }}>{title}</DialogTitle>}

      <DialogContent dividers={!!title}>
        <Box sx={{ pt: title ? 0 : 1 }}>{children}</Box>
      </DialogContent>

      {footer && <DialogActions sx={{ px: 3, pb: 2 }}>{footer}</DialogActions>}
    </Dialog>
  );
};
