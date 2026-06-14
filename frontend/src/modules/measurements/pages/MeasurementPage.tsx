import React from 'react';
import { useState } from 'react';
import { MeasurementList } from '../components/MeasurementList';
import { useMeasurements } from '../hooks/useMeasurements';
import { MeasurementCategoryList } from '../components/MeasurementCategoryList';
import { Box, Button, CircularProgress, Drawer, IconButton, Typography } from '@mui/material';
import { AddOutlined, CloseOutlined, HistoryOutlined, SettingsOutlined } from '@mui/icons-material';

const DRAWER_WIDTH = 320;

export const MeasurementPage: React.FC = () => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const { measurements, isLoading } = useMeasurements();

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
        open={leftDrawerOpen}
        sx={{
          width: leftDrawerOpen ? DRAWER_WIDTH : 0,
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
          <IconButton size="small" onClick={() => setLeftDrawerOpen(false)}>
            <CloseOutlined fontSize="small" />
          </IconButton>
        </Box>
        <MeasurementList measurements={measurements} onAdd={() => {}} onEdit={() => {}} onDelete={() => {}} />
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
          <Button variant="text" startIcon={<HistoryOutlined />} onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}>
            Measurements
          </Button>
          <Button variant="text" startIcon={<SettingsOutlined />} onClick={() => setRightDrawerOpen(!rightDrawerOpen)}>
            Categories
          </Button>
          <Button variant="contained" startIcon={<AddOutlined />}>
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
        open={rightDrawerOpen}
        sx={{
          width: rightDrawerOpen ? DRAWER_WIDTH : 0,
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
          <IconButton size="small" onClick={() => setRightDrawerOpen(false)}>
            <CloseOutlined fontSize="small" />
          </IconButton>
        </Box>
        <MeasurementCategoryList />
      </Drawer>
    </Box>
  );
};
