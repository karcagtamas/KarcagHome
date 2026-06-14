import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { useAccounts } from '../../../hooks/useAccounts';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { AccountEditDialog } from '../dialogs/AccountEditDialog';
import { useState } from 'react';
import type { AccountEditDTO } from '../models/account';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountApi } from '../../../api/account.api';
import { accountKeys } from '../../../keys/accountKeys';
import { useNavigate } from 'react-router-dom';
import { AccountTile } from '../components/AccountTile';
import { Box, Button, IconButton } from '@mui/material';
import { AddOutlined, BookmarkBorderOutlined, CurrencyExchangeOutlined } from '@mui/icons-material';

export const AccountsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [accountDialogOpen, setAccountDialogOpen] = useState(false);
  const { data, isLoading } = useAccounts();

  const createMutation = useMutation({
    mutationFn: accountApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.all });
    },
  });

  const apiLoading = createMutation.isPending;

  const handleSubmit = async (data: AccountEditDTO) => {
    await createMutation.mutateAsync(data);
  };

  return (
    <PageFrame>
      <PageHeader
        title="Accounts"
        actions={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => navigate('/currencies')} title="Currencies" size="small">
              <CurrencyExchangeOutlined fontSize="small" />
            </IconButton>

            <IconButton onClick={() => navigate('/expense-categories')} title="Expense Categories" size="small">
              <BookmarkBorderOutlined fontSize="small" />
            </IconButton>

            <Button
              variant="contained"
              startIcon={<AddOutlined />}
              onClick={() => setAccountDialogOpen(true)}
              size="small"
              sx={{ ml: 1 }}
            >
              Create
            </Button>
          </Box>
        }
      ></PageHeader>

      <LoadingBox isLoading={isLoading}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
            alignItems: 'stretch',
            padding: '1rem',
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          {data?.map((account) => (
            <AccountTile key={account.id} account={account} onClick={() => navigate(`/accounts/${account.id}`)} />
          ))}
        </Box>
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
