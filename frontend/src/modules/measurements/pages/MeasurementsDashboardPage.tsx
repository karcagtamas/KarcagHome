import React from 'react';
import { Box, Button, CircularProgress, Drawer, IconButton, Typography } from '@mui/material';
import { AddOutlined, CategoryOutlined, CloseOutlined, HistoryOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useMeasurementCategories } from '../hooks/useMeasurementCategories';
import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { MeasurementCategoryTile } from '../components/MeasurementCategoryTile';

const DRAWER_WIDTH = 320;

export const MeasurementsDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading } = useMeasurementCategories();

  return (
    <PageFrame>
      <PageHeader title="Measurements"></PageHeader>

      <LoadingBox isLoading={isLoading}>
        <Box>
          {categories?.map((category) => (
            <MeasurementCategoryTile key={category.id} category={category} />
          ))}
        </Box>
      </LoadingBox>
    </PageFrame>
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          gap: 2,
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="body2" color="text.secondary">
          Loading data...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Drawer
        variant="persistent"
        anchor="left"
        open={false}
        sx={{
          width: false ? DRAWER_WIDTH : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            position: 'absolute',
            height: '100%',
            borderRight: '1px solid',
            borderColor: 'divider',
            p: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Measurements
          </Typography>
          <IconButton size="small">
            <CloseOutlined fontSize="small" />
          </IconButton>
        </Box>
      </Drawer>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minWidth: 0,
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '8px',
            gap: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Button variant="text" startIcon={<HistoryOutlined />}>
            Measurements
          </Button>
          <Button
            variant="text"
            startIcon={<CategoryOutlined />}
            onClick={() => navigate('/measurement-categories')}
            size="small"
          >
            Categories
          </Button>
          <Button variant="contained" startIcon={<AddOutlined />} size="small">
            Add
          </Button>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
          }}
        />
      </Box>

      <Drawer
        variant="persistent"
        anchor="right"
        open={false}
        sx={{
          width: false ? DRAWER_WIDTH : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            position: 'absolute',
            height: '100%',
            borderLeft: '1px solid',
            borderColor: 'divider',
            p: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Categories
          </Typography>
          <IconButton size="small">
            <CloseOutlined fontSize="small" />
          </IconButton>
        </Box>
      </Drawer>
    </Box>
  );
};
