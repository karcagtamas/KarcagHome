import { useParams } from 'react-router-dom';
import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { useAccount } from '../../../hooks/useAccount';
import { LoadingBox } from '../../../components/common/LoadingBox';

export const AccountPage: React.FC = () => {
  const { id } = useParams();

  const accountId = id ? parseInt(id) : undefined;
  const { data, isLoading } = useAccount(accountId);

  return (
    <LoadingBox isLoading={isLoading}>
      <PageFrame>
        <PageHeader title={data?.name} />
      </PageFrame>
    </LoadingBox>
  );
};
