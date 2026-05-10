import { useNavigate, useParams } from 'react-router-dom';
import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { useAccount } from '../../../hooks/useAccount';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { Button } from '@fluentui/react-components';
import { DeleteRegular, EditRegular } from '@fluentui/react-icons';
import { AccountEditDialog } from '../dialogs/AccountEditDialog';
import { useState } from 'react';
import type { AccountEditDTO } from '../models/account';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountApi } from '../../../api/account.api';
import { accountKeys } from '../../../keys/accountKeys';
import { ConfirmDialog } from '../../../components/dialog/ConfirmDialog';

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
      await updateMutation.mutateAsync({ id: accountId, data });
    }
  };

  return (
    <LoadingBox isLoading={isLoading}>
      <PageFrame>
        <PageHeader
          title={data?.name}
          actions={
            <>
              <Button icon={<EditRegular />} onClick={() => setAccountDialogOpen(true)} />
              <Button icon={<DeleteRegular />} onClick={() => setConfirmRemoveDialogOpen(true)} />
            </>
          }
        />
      </PageFrame>

      <AccountEditDialog
        open={accountDialogOpen}
        account={data}
        onClose={() => setAccountDialogOpen(false)}
        onSubmit={handleSubmit}
        loading={apiLoading}
      />

      <ConfirmDialog
              open={confirmRemoveDialogOpen}
              title="Remove Account"
              message={
                <>
                  Are you sure you want to remove <strong>{data?.name}</strong> account?{' '}
                </>
              }
              confirmText="Remove"
              danger
              onClose={() => setConfirmRemoveDialogOpen(false)}
              onConfirm={async () => {
                if (accountId !== undefined) {
                  await removeMutation.mutateAsync(accountId);
                  navigate("/accounts");
                }
                setConfirmRemoveDialogOpen(false);
              }}
            ></ConfirmDialog>
    </LoadingBox>
  );
};
