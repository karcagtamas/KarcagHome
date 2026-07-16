import React from 'react';
import { Box, IconButton } from '@mui/material';
import { useMeasurementCategories } from '../hooks/useMeasurementCategories';
import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { MeasurementCategoryTile } from '../components/MeasurementCategoryTile';
import { CategoryOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const MeasurementsDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading } = useMeasurementCategories();

  return (
    <PageFrame>
      <PageHeader
        title="Measurements"
        actions={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small" color="info" onClick={() => navigate('/measurement-categories')}>
              <CategoryOutlined fontSize="small" />
            </IconButton>
          </Box>
        }
      ></PageHeader>

      <LoadingBox isLoading={isLoading}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(620px, 1fr))',
            gap: '1rem',
            alignItems: 'stretch',
            padding: '1rem',
            width: '100%',
          }}
        >
          {categories?.map((category) => (
            <MeasurementCategoryTile key={category.id} category={category} />
          ))}
        </Box>
      </LoadingBox>
    </PageFrame>
  );
};
