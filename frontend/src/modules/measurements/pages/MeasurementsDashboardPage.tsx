import React from 'react';
import { Box } from '@mui/material';
import { useMeasurementCategories } from '../hooks/useMeasurementCategories';
import { PageFrame } from '../../../components/common/PageFrame';
import { PageHeader } from '../../../components/common/PageHeader';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { MeasurementCategoryTile } from '../components/MeasurementCategoryTile';

export const MeasurementsDashboardPage: React.FC = () => {
  const { data: categories, isLoading } = useMeasurementCategories();

  return (
    <PageFrame>
      <PageHeader title="Measurements"></PageHeader>

      <LoadingBox isLoading={isLoading}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
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
