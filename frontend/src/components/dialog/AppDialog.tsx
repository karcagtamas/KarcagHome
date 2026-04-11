import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from "@fluentui/react-components";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;

  trigger?: React.ReactElement;
};

export const AppDialog: React.FC<Props> = ({ open, onOpenChange, title, children, footer, trigger }) => {
  return (
    <Dialog open={open} onOpenChange={(_, data) => onOpenChange(data.open)}>
      {trigger ? (
        <DialogTrigger>{trigger}</DialogTrigger>
      ) : (
        <></>
      )}

      <DialogSurface>
        {title && <DialogTitle>{title}</DialogTitle>}

        <DialogBody>
          <DialogContent>{children}</DialogContent>

          {footer && <DialogActions>{footer}</DialogActions>}
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
