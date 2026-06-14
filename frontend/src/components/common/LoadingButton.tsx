import { Button, CircularProgress } from '@mui/material';

type Props = {
  isLoading?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'inherit';
};

export const LoadingButton: React.FC<Props> = ({
  isLoading,
  children,
  disabled,
  onClick,
  variant = 'contained',
  color = 'primary',
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : null}
    >
      {children}
    </Button>
  );
};
