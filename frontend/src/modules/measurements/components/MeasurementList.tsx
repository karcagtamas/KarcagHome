import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type { Measurement } from '../models/measurement';
import { Box, Button, IconButton } from '@mui/material';
import { AddOutlined, DeleteOutlined, EditOutlined } from '@mui/icons-material';

type Props = {
  measurements: Measurement[];
  onEdit: (m: Measurement) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
};

export const MeasurementList: React.FC<Props> = ({ measurements, onEdit, onDelete, onAdd }) => {
  const columns: GridColDef<Measurement>[] = [
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      valueFormatter: (value) => (value ? new Date(value).toLocaleDateString() : ''),
    },
    {
      field: 'value',
      headerName: 'Value',
      type: 'number',
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      cellClassName: 'mui-grid-font-semibold',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', height: '100%' }}>
          <IconButton size="small" onClick={() => onEdit(params.row)}>
            <EditOutlined fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => onDelete(params.row.id)}>
            <DeleteOutlined fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ alignSelf: 'flex-start' }}>
        <Button variant="contained" startIcon={<AddOutlined />} onClick={onAdd} size="small">
          Add Measurement
        </Button>
      </Box>

      <Box sx={{ width: '100%', height: 400 }}>
        <DataGrid
          rows={measurements}
          columns={columns}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          sx={{
            '& .MuiDataGrid-cell:focus': { outline: 'none' },
            '& .mui-grid-font-semibold': { fontWeight: 600 },
          }}
        />
      </Box>
    </Box>
  );
};
