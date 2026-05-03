import { Button, Spinner } from '@fluentui/react-components';

type Props = {
  isLoading?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  appearance?: 'secondary' | 'primary' | 'outline' | 'subtle' | 'transparent';
};

export const LoadingButton: React.FC<Props> = ({ isLoading, children, disabled, onClick, appearance }) => {
  <Button appearance={appearance} onClick={onClick} disabled={disabled}>
    {isLoading ? <Spinner size="tiny" /> : { children }}
  </Button>;
};
