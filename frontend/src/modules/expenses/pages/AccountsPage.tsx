import { AddRegular } from '@fluentui/react-icons';
import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { useAccounts } from '../../../hooks/useAccounts';
import { Button } from '@fluentui/react-components';
import { LoadingBox } from '../../../components/common/LoadingBox';

export const AccountsPage: React.FC = () => {
  const { data, isLoading } = useAccounts();

  const handleCreate = () => {};

  return (
    <PageFrame>
      <PageHeader title="Accounts" actions={<Button icon={<AddRegular />} onClick={handleCreate} />}></PageHeader>

      <LoadingBox isLoading={isLoading}>
        {data?.map((d) => (
          <div></div>
        ))}
      </LoadingBox>
    </PageFrame>
  );
};
