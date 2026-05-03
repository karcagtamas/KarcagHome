import { AddRegular, BookmarkRegular, CurrencyDollarEuroRegular } from '@fluentui/react-icons';
import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { useAccounts } from '../../../hooks/useAccounts';
import { Button, makeStyles } from '@fluentui/react-components';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { AccountEditDialog } from '../dialogs/AccountEditDialog';
import { useState } from 'react';
import type { AccountEditDTO } from '../models/account';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountApi } from '../../../api/account.api';
import { accountKeys } from '../../../keys/accountKeys';
import { useNavigate } from 'react-router-dom';
import { AccountTile } from '../components/AccountTile';

const useStyles = makeStyles({
  accountsBox: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
    alignItems: 'stretch',
    padding: '1rem',
  },
  accountTile: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const AccountsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const styles = useStyles();

  const [accountDialogOpen, setAccountDialogOpen] = useState(false);
  const { data, isLoading } = useAccounts();

  const createMutation = useMutation({
    mutationFn: accountApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.all });
    },
  });

  const apiLoading = createMutation.isPending;

  const handleSubmit = async (data: AccountEditDTO, _: number | undefined) => {
    await createMutation.mutateAsync(data);
  };

  return (
    <PageFrame>
      <PageHeader
        title="Accounts"
        actions={
          <>
            <Button icon={<AddRegular />} onClick={() => setAccountDialogOpen(true)} />

            <Button icon={<CurrencyDollarEuroRegular />} onClick={() => navigate('/currencies')} />
            <Button icon={<BookmarkRegular />} onClick={() => navigate('/expense-categories')} />
          </>
        }
      ></PageHeader>

      <LoadingBox isLoading={isLoading}>
        <div className={styles.accountsBox}>
          {data?.map((account) => (
            <AccountTile
              className={styles.accountTile}
              key={account.id}
              account={account}
              onClick={() => navigate(`/accounts/${account.id}`)}
            />
          ))}
        </div>
      </LoadingBox>

      <AccountEditDialog
        open={accountDialogOpen}
        account={null}
        onClose={() => setAccountDialogOpen(false)}
        onSubmit={handleSubmit}
        loading={apiLoading}
      />
    </PageFrame>
  );
};
