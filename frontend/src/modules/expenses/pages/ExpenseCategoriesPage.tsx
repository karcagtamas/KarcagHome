import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@fluentui/react-components';
import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { AddRegular, DeleteRegular, EditRegular } from '@fluentui/react-icons';
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

  const removeMutation = useMutation({
    mutationFn: expenseCategoryApi.delete,
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

  const handleRemove = async (expenseCategory: ExpenseCategoryDTO) => {
    await removeMutation.mutateAsync(expenseCategory.id);
  };

  const apiLoading = createMutation.isPending || updateMutation.isPending || removeMutation.isPending;

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Color</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.color}</TableCell>
                <TableCell>{e.type.name}</TableCell>
                <TableCell>
                  <Button icon={<EditRegular />} appearance="subtle" onClick={() => handleEdit(e)} />
                  <Button icon={<DeleteRegular />} appearance="subtle" onClick={async () => await handleRemove(e)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
