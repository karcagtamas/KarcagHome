import { ContentCard } from '../../../components/common/ContentCard';
import { useState } from 'react';
import { ExpenseEditDialog } from '../dialogs/ExpenseEditDialog';
import type { ExpenseCategoryDTO, ExpenseDTO, ExpenseEditDTO } from '../models/expenses';
import { Box, IconButton, Typography } from '@mui/material';
import { AddOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { useExpenseMutations } from '../hooks/useExpenseMutations';
import { useExpenseTree } from '../hooks/useExpenseTree';
import { SimpleTreeView, TreeItem, treeItemClasses } from '@mui/x-tree-view';
import { LoadingBox } from '../../../components/common/LoadingBox';

type Props = {
  accountId: number;
};

export const Expenses: React.FC<Props> = ({ accountId }) => {
  const { data, isLoading } = useExpenseTree(accountId);
  const { createMutation, updateMutation, removeMutation, isPending: apiLoading } = useExpenseMutations(accountId);

  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseDTO | null>(null);

  const handleCreate = () => {
    setSelectedExpense(null);
    setExpenseDialogOpen(true);
  };

  const handleEdit = (expense: ExpenseDTO) => {
    setSelectedExpense(expense);
    setExpenseDialogOpen(true);
  };

  const handleRemove = async (expense: ExpenseDTO) => {
    try {
      await removeMutation.mutateAsync(expense.id);
    } catch (err) {
      console.error('Expense removal failed', err);
    }
  };

  const handleSubmit = async (data: ExpenseEditDTO, id: number | undefined) => {
    try {
      if (id) {
        await updateMutation.mutateAsync({ id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
    } catch (err) {
      console.error('Expense modification failed', err);
    }
  };

  const renderParentLabel = (parent: string) => (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Typography>{parent}</Typography>
    </Box>
  );

  const renderCategoryLabel = (category: ExpenseCategoryDTO) => (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Typography sx={{ color: category.color }}>
        <strong>{category.name}</strong> [{category.type.name}]
      </Typography>
    </Box>
  );

  const renderExpenseLabel = (expense: ExpenseDTO) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Typography>
        {expense.amount} {expense.account.currency.abbreviation}
      </Typography>

      <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
        <IconButton size="small" color="warning" onClick={() => handleEdit(expense)} disabled={apiLoading}>
          <EditOutlined fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" onClick={() => handleRemove(expense)} disabled={apiLoading}>
          <DeleteOutlined fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      <ContentCard
        caption="Expenses"
        actions={
          <IconButton onClick={handleCreate} size="small" color="primary">
            <AddOutlined />
          </IconButton>
        }
      >
        <Box sx={{ width: '100%', height: 400 }}>
          <LoadingBox isLoading={isLoading}>
            <SimpleTreeView
              sx={{
                [`&.${treeItemClasses.root}`]: {
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                },
              }}
            >
              {(data ?? []).map((parent) => {
                const parentId = `parent-${parent.date}`;

                return (
                  <TreeItem key={parentId} itemId={parentId} label={renderParentLabel(parent.date)}>
                    {parent.categories.map((category) => {
                      const categoryId = `cat-${category.category.id}-${parent.date}`;

                      return (
                        <TreeItem key={categoryId} itemId={categoryId} label={renderCategoryLabel(category.category)}>
                          {category.expenses.map((expense) => {
                            const expenseId = `exp-${expense.id}`;

                            return <TreeItem key={expenseId} itemId={expenseId} label={renderExpenseLabel(expense)} />;
                          })}
                        </TreeItem>
                      );
                    })}
                  </TreeItem>
                );
              })}
            </SimpleTreeView>
          </LoadingBox>
        </Box>
      </ContentCard>

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
