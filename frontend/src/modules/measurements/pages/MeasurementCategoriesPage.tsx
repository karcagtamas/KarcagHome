import type React from 'react';
import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { Box, Button, IconButton } from '@mui/material';
import { AddOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import type { MeasurementCategoryDTO, MeasurementCategoryEditDTO } from '../models/measurement';
import { useMeasurementCategories } from '../hooks/useMeasurementCategories';
import { measurementCategoryApi } from '../api/measurement-category.api';
import { measurementKeys } from '../../../keys/measurementKeys';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { MeasurementCategoryEditDialog } from '../dialogs/MeasurementCategoryEditDialog';

export const MeasurementCategoriesPage: React.FC = () => {
  const queryClient = useQueryClient();

  const [measurementCategoryDialogOpen, setMeasurementCategoryDialogOpen] = useState(false);
  const [selectedMeasurementCategory, setSelectedMeasurementCategory] = useState<MeasurementCategoryDTO | null>(null);
  const { data, isLoading } = useMeasurementCategories();

  const createMutation = useMutation({
    mutationFn: measurementCategoryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: measurementKeys.categories() });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MeasurementCategoryEditDTO }) =>
      measurementCategoryApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: measurementKeys.categories() });
    },
  });

  const removeMutation = useMutation({
    mutationFn: measurementCategoryApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: measurementKeys.categories() });
    },
  });

  const handleCreate = () => {
    setSelectedMeasurementCategory(null);
    setMeasurementCategoryDialogOpen(true);
  };

  const handleEdit = (measurementCategory: MeasurementCategoryDTO) => {
    setSelectedMeasurementCategory(measurementCategory);
    setMeasurementCategoryDialogOpen(true);
  };

  const handleRemove = async (measurementCategory: MeasurementCategoryDTO) => {
    await removeMutation.mutateAsync(measurementCategory.id);
  };

  const apiLoading = createMutation.isPending || updateMutation.isPending || removeMutation.isPending;

  const handleSubmit = async (data: MeasurementCategoryEditDTO, id?: number) => {
    if (id) {
      await updateMutation.mutateAsync({ id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const columns: GridColDef<MeasurementCategoryDTO>[] = [
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
      field: 'unit',
      headerName: 'Unit',
      flex: 1,
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
    <PageFrame>
      <PageHeader
        title="Measurement Categories"
        actions={
          <Button variant="contained" startIcon={<AddOutlined />} onClick={handleCreate}>
            Create
          </Button>
        }
      ></PageHeader>

      <LoadingBox isLoading={isLoading}>
        <Box sx={{ padding: '1rem', width: '100%', height: 500, boxSizing: 'border-box' }}>
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

      <MeasurementCategoryEditDialog
        open={measurementCategoryDialogOpen}
        measurementCategory={selectedMeasurementCategory}
        loading={apiLoading}
        onClose={() => setMeasurementCategoryDialogOpen(false)}
        onSubmit={handleSubmit}
      />
    </PageFrame>
  );
};
