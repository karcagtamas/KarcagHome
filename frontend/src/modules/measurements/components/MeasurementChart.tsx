import { Box } from '@mui/material';
import type { MeasurementCategoryDTO, MeasurementDTO } from '../models/measurement';
import { LineChart } from '@mui/x-charts';

type Props = {
  category: MeasurementCategoryDTO;
  measurements: MeasurementDTO[];
};

export const MeasurementChart: React.FC<Props> = ({ category, measurements }) => {
  const xData = measurements.map((m) => new Date(m.date));
  const yData = measurements.map((m) => m.value);

  return (
    <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>
      <LineChart
        series={[
          {
            data: yData,
            label: `${category.name || 'Measurement'} over Time`,
            color: category.color,
            showMark: true,
          },
        ]}
        xAxis={[
          {
            data: xData,
            scaleType: 'time',
            valueFormatter: (date: Date) => date.toLocaleDateString(),
          },
        ]}
        height={300}
        slotProps={{
          legend: {
            direction: 'horizontal',
            position: { vertical: 'bottom', horizontal: 'center' },
          },
        }}
      />
    </Box>
  );
};
