import { useExpenses } from '../../../hooks/useExpenses';
import { ContentCard } from '../../../components/common/ContentCard';
import { useState } from 'react';
import { ExpenseEditDialog } from '../dialogs/ExpenseEditDialog';
import type { ExpenseDTO, ExpenseEditDTO } from '../models/expenses';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { expenseApi } from '../../../api/expense.api';
import { expenseKeys } from '../../../keys/expenseKeys';
import { Box, IconButton } from '@mui/material';
import { AddOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

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

  const columns: GridColDef<ExpenseDTO>[] = [
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      valueGetter: (_, row) => row.category.name,
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', height: '100%' }}>
          <IconButton size="small" onClick={() => handleEdit(params.row)} disabled={apiLoading}>
            <EditOutlined fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleRemove(params.row)} disabled={apiLoading}>
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

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
          <DataGrid
            rows={data ?? []}
            columns={columns}
            loading={isLoading}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell:focus': { outline: 'none' },
            }}
          />
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
