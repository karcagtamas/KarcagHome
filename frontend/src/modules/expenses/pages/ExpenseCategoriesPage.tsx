import { Button } from '@fluentui/react-components';
import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { AddRegular } from '@fluentui/react-icons';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseCategoryApi } from '../../../api/expense-category.api';
import { expenseKeys } from '../../../keys/expenseKeys';
import { useExpenseCategories } from '../../../hooks/useExpenseCategories';
import { LoadingBox } from '../../../components/common/LoadingBox';
import type { ExpenseCategoryDTO, ExpenseCategoryEditDTO } from '../models/expenses';
import { ExpenseCategoryEditDialog } from '../dialogs/ExpenseCategoryEditDialog';

export const ExpenseCategoriesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [expenseCategoryDialogOpen, setExpenseCategoryDialogOpen] = useState(false);
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState<ExpenseCategoryDTO | null>(null);

  const { data, isLoading } = useExpenseCategories();

  const createMutation = useMutation({
    mutationFn: expenseCategoryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.categories() });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ExpenseCategoryEditDTO }) => expenseCategoryApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.categories() });
    },
  });

  const handleCreate = () => {
    setSelectedExpenseCategory(null);
    setExpenseCategoryDialogOpen(true);
  };

  const handleEdit = (expenseCategory: ExpenseCategoryDTO) => {
    setSelectedExpenseCategory(expenseCategory);
    setExpenseCategoryDialogOpen(true);
  };

  const apiLoading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (data: ExpenseCategoryEditDTO, id: number | undefined) => {
    if (id) {
      await updateMutation.mutateAsync({ id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  return (
    <PageFrame>
      <PageHeader
        title={'Expense Categories'}
        actions={<Button icon={<AddRegular />} onClick={handleCreate} />}
      ></PageHeader>

      <LoadingBox isLoading={isLoading}>
        <div></div>
      </LoadingBox>

      <ExpenseCategoryEditDialog
        open={expenseCategoryDialogOpen}
        expenseCategory={selectedExpenseCategory}
        loading={apiLoading}
        onClose={() => setExpenseCategoryDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </PageFrame>
  );
};
