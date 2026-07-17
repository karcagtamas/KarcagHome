import { LoadingBox } from '../../../components/common/LoadingBox';
import { Box, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { useOverdueChart } from '../hooks/useOverdueChart';

type Props = {
  showAll: boolean;
  importance: number | null;
};

export const TaskOverdueChart: React.FC<Props> = ({ showAll, importance }) => {
  const theme = useTheme();
  const { data: overdueChart, isLoading } = useOverdueChart(showAll, importance);

  const seriesData =
    overdueChart?.map((e) => {
      return {
        id: `overdue-${e.overdue ? 'true' : 'false'}`,
        value: e.count,
        label: e.overdue ? 'Overdue' : 'In Time',
        color: e.overdue ? theme.palette.error.main : '#9e9e9e',
      };
    }) ?? [];

  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <LoadingBox isLoading={isLoading}>
        <PieChart
          series={[
            {
              data: seriesData,
              innerRadius: 60,
              outerRadius: 80,
              paddingAngle: 4,
              cornerRadius: 4,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 30, additionalRadius: -10, color: 'gray' },
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
      </LoadingBox>
    </Box>
  );
};
