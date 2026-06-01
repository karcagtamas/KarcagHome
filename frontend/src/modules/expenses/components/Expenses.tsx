import { useExpenses } from '../../../hooks/useExpenses';
import { Box } from '../../../components/common/Box';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@fluentui/react-components';
import { AddRegular, DeleteRegular, EditRegular } from '@fluentui/react-icons';
import { useState } from 'react';
import { ExpenseEditDialog } from '../dialogs/ExpenseEditDialog';
import type { ExpenseDTO, ExpenseEditDTO } from '../models/expenses';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseApi } from '../../../api/expense.api';
import { expenseKeys } from '../../../keys/expenseKeys';

type Props = {
  accountId: number;
};

export const Expenses: React.FC<Props> = ({ accountId }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useExpenses(accountId);

  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseDTO | null>(null);

  const createMutation = useMutation({
    mutationFn: expenseApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ExpenseEditDTO }) => expenseApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });

  const removeMutation = useMutation({
    mutationFn: expenseApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
  });

  const handleCreate = () => {
    setSelectedExpense(null);
    setExpenseDialogOpen(true);
  };

  const handleEdit = (expense: ExpenseDTO) => {
    setSelectedExpense(expense);
    setExpenseDialogOpen(true);
  };

  const handleRemove = async (expense: ExpenseDTO) => {
    await removeMutation.mutateAsync(expense.id);
  };

  const apiLoading = createMutation.isPending || updateMutation.isPending || removeMutation.isPending;

  const handleSubmit = async (data: Omit<ExpenseEditDTO, 'id'>, id: number | undefined) => {
    if (id) {
      await updateMutation.mutateAsync({ id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  return (
    <>
      <Box
        caption="Expenses"
        actions={
          <>
            <Button appearance="subtle" icon={<AddRegular />} onClick={handleCreate} />
          </>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((e) => (
              <TableRow key={e.id}>
                <TableCell>{e.category.name}</TableCell>
                <TableCell>{e.date}</TableCell>
                <TableCell>{e.amount}</TableCell>
                <TableCell>
                  <Button icon={<EditRegular />} appearance="subtle" onClick={() => handleEdit(e)} />
                  <Button icon={<DeleteRegular />} appearance="subtle" onClick={async () => await handleRemove(e)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <ExpenseEditDialog
        open={expenseDialogOpen}
        expense={selectedExpense}
        accountId={accountId}
        onClose={() => setExpenseDialogOpen(false)}
        onSubmit={handleSubmit}
        loading={apiLoading}
      />
    </>
  );
};
