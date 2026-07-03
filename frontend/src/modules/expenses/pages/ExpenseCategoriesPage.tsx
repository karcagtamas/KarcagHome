import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { useState } from 'react';
import { useExpenseCategories } from '../hooks/useExpenseCategories';
import { LoadingBox } from '../../../components/common/LoadingBox';
import type { ExpenseCategoryDTO, ExpenseCategoryEditDTO } from '../models/expenses';
import { ExpenseCategoryEditDialog } from '../dialogs/ExpenseCategoryEditDialog';
import { Box, Button, IconButton } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { AddOutlined, ArrowBackOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { useExpenseCategoryMutations } from '../hooks/useExpenseCategoryMutations';
import { useNavigate } from 'react-router-dom';

export const ExpenseCategoriesPage: React.FC = () => {
  const navigate = useNavigate();

  const [expenseCategoryDialogOpen, setExpenseCategoryDialogOpen] = useState(false);
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState<ExpenseCategoryDTO | null>(null);

  const { data, isLoading } = useExpenseCategories();
  const { createMutation, updateMutation, removeMutation, isPending: apiLoading } = useExpenseCategoryMutations();

  const handleCreate = () => {
    setSelectedExpenseCategory(null);
    setExpenseCategoryDialogOpen(true);
  };

  const handleEdit = (expenseCategory: ExpenseCategoryDTO) => {
    setSelectedExpenseCategory(expenseCategory);
    setExpenseCategoryDialogOpen(true);
  };

  const handleRemove = async (expenseCategory: ExpenseCategoryDTO) => {
    try {
      await removeMutation.mutateAsync(expenseCategory.id);
    } catch (err) {
      console.error('Category deletion failed', err);
    }
  };

  const handleSubmit = async (data: ExpenseCategoryEditDTO, id: number | undefined) => {
    try {
      if (id) {
        await updateMutation.mutateAsync({ id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
    } catch (err) {
      console.error('Category configuration save failed', err);
    }
  };

  const columns: GridColDef<ExpenseCategoryDTO>[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'color',
      headerName: 'Color',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, height: '100%' }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: params.value,
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
          <code>{params.value}</code>
        </Box>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      valueGetter: (_, row) => row.type?.name ?? '',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', height: '100%' }}>
          <IconButton size="small" color="warning" onClick={() => handleEdit(params.row)} disabled={apiLoading}>
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
    <PageFrame>
      <PageHeader
        title="Expense Categories"
        actions={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="contained" startIcon={<AddOutlined />} onClick={handleCreate} size="small">
              Create
            </Button>

            <IconButton size="small" color="info" onClick={() => navigate('/accounts')} disabled={apiLoading}>
              <ArrowBackOutlined fontSize="small" />
            </IconButton>
          </Box>
        }
      ></PageHeader>

      <LoadingBox isLoading={isLoading}>
        <Box sx={{ padding: '1rem', width: '100%', height: 500 }}>
          <DataGrid
            rows={data ?? []}
            columns={columns}
            loading={isLoading}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 20]}
            sx={{
              '& .MuiDataGrid-cell:focus': { outline: 'none' },
            }}
          />
        </Box>
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
