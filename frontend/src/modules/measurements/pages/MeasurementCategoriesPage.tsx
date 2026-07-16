import type React from 'react';
import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { Box, Button, IconButton } from '@mui/material';
import { AddOutlined, ArrowBackOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { useState } from 'react';
import type { MeasurementCategoryDTO, MeasurementCategoryEditDTO } from '../models/measurement';
import { useMeasurementCategories } from '../hooks/useMeasurementCategories';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { MeasurementCategoryEditDialog } from '../dialogs/MeasurementCategoryEditDialog';
import { useMeasurementCategoryMutations } from '../hooks/useMeasurementCategoryMutations';
import { useNavigate } from 'react-router-dom';

export const MeasurementCategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const [measurementCategoryDialogOpen, setMeasurementCategoryDialogOpen] = useState(false);
  const [selectedMeasurementCategory, setSelectedMeasurementCategory] = useState<MeasurementCategoryDTO | null>(null);

  const { data, isLoading } = useMeasurementCategories();
  const { createMutation, updateMutation, removeMutation, isPending: apiLoading } = useMeasurementCategoryMutations();

  const handleCreate = () => {
    setSelectedMeasurementCategory(null);
    setMeasurementCategoryDialogOpen(true);
  };

  const handleEdit = (measurementCategory: MeasurementCategoryDTO) => {
    setSelectedMeasurementCategory(measurementCategory);
    setMeasurementCategoryDialogOpen(true);
  };

  const handleRemove = async (measurementCategory: MeasurementCategoryDTO) => {
    try {
      await removeMutation.mutateAsync(measurementCategory.id);
    } catch (err) {
      console.error('Measurement category deletion encountered errors', err);
    }
  };

  const handleSubmit = async (data: MeasurementCategoryEditDTO, id?: number) => {
    try {
      if (id) {
        await updateMutation.mutateAsync({ id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
    } catch (err) {
      console.error('Measurement category payload submission failed', err);
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
        title="Measurement Categories"
        actions={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="contained" startIcon={<AddOutlined />} onClick={handleCreate} size="small">
              Create
            </Button>

            <IconButton size="small" color="info" onClick={() => navigate('/measurements')} disabled={apiLoading}>
              <ArrowBackOutlined fontSize="small" />
            </IconButton>
          </Box>
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
            hideFooter
            sx={{
              '& .MuiDataGrid-cell:focus': { outline: 'none' },
            }}
          />
        </Box>
      </LoadingBox>

      {measurementCategoryDialogOpen && (
        <MeasurementCategoryEditDialog
          key={selectedMeasurementCategory ? `edit-measurement-cat-${selectedMeasurementCategory.id}` : 'create-measurement-cat'}
          open={measurementCategoryDialogOpen}
          measurementCategory={selectedMeasurementCategory}
          loading={apiLoading}
          onClose={() => setMeasurementCategoryDialogOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </PageFrame>
  );
};
