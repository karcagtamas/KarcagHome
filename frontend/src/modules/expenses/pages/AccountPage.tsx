import { useNavigate, useParams } from 'react-router-dom';
import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { useAccount } from '../hooks/useAccount';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { AccountEditDialog } from '../dialogs/AccountEditDialog';
import { useState } from 'react';
import type { AccountEditDTO } from '../models/account';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountApi } from '../../../api/account.api';
import { accountKeys } from '../../../keys/accountKeys';
import { ConfirmDialog } from '../../../components/dialog/ConfirmDialog';
import { AccountSummary } from '../components/AccountSummary';
import { Expenses } from '../components/Expenses';
import { Box, IconButton } from '@mui/material';
import { ArrowBackOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material';

export const AccountPage: React.FC = () => {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const accountId = id ? parseInt(id) : undefined;
  const { data, isLoading } = useAccount(accountId);

  const [accountDialogOpen, setAccountDialogOpen] = useState(false);
  const [confirmRemoveDialogOpen, setConfirmRemoveDialogOpen] = useState(false);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: AccountEditDTO }) => accountApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.all });

      if (accountId !== undefined) {
        queryClient.invalidateQueries({ queryKey: accountKeys.detail(accountId) });
      }
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => accountApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountKeys.all });
    },
  });

  const apiLoading = updateMutation.isPending || removeMutation.isPending;

  const handleSubmit = async (data: AccountEditDTO) => {
    if (accountId !== undefined) {
      try {
        await updateMutation.mutateAsync({ id: accountId, data: data });
      } catch (err) {
        console.error('Account updates failed to complete', err);
      }
    }
  };

  const handleConfirmRemove = async () => {
    if (accountId !== undefined) {
      try {
        await removeMutation.mutateAsync(accountId);
        navigate('/accounts');
      } catch (err) {
        console.error('Account removal failed to complete', err);
      } finally {
        setConfirmRemoveDialogOpen(false);
      }
    }
  };

  return (
    <LoadingBox isLoading={isLoading}>
      <PageFrame>
        <PageHeader
          title={data?.name}
          actions={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                color="info"
                onClick={() => navigate('/accounts')}
                disabled={apiLoading}
              >
                <ArrowBackOutlined fontSize="small" />
              </IconButton>
              <IconButton size="small" color="warning" onClick={() => setAccountDialogOpen(true)} disabled={apiLoading}>
                <EditOutlined fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => setConfirmRemoveDialogOpen(true)}
                disabled={apiLoading}
              >
                <DeleteOutlined fontSize="small" />
              </IconButton>
            </Box>
          }
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: '8px',
            boxSizing: 'border-box',
            width: '100%',
          }}
        >
          {accountId !== undefined && <AccountSummary accountId={accountId} />}
          {accountId !== undefined && <Expenses accountId={accountId} />}
        </Box>
      </PageFrame>

      {accountDialogOpen && (
        <AccountEditDialog
          key={data ? `edit-${data.id}` : 'empty-account'}
          open={accountDialogOpen}
          account={data}
          onClose={() => setAccountDialogOpen(false)}
          onSubmit={handleSubmit}
          loading={apiLoading}
        />
      )}

      <ConfirmDialog
        open={confirmRemoveDialogOpen}
        title="Remove Account"
        message={
          <>
            Are you sure you want to remove the <strong>{data?.name}</strong> account?{' '}
          </>
        }
        confirmText="Remove"
        danger
        onClose={() => setConfirmRemoveDialogOpen(false)}
        onConfirm={handleConfirmRemove}
      />
    </LoadingBox>
  );
};
