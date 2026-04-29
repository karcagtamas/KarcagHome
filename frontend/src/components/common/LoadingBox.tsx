import { Spinner } from '@fluentui/react-components';

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
};

export const LoadingBox: React.FC<Props> = ({ isLoading, children }) => {
  return isLoading ? <Spinner /> : <>{children}</>;
};
