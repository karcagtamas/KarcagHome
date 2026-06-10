import { useCompletedChart } from '../hooks/useCompletedChart';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { Box } from '@mui/material';
import { PieChart } from '@mui/x-charts';

type Props = {
  showAll: boolean;
  importance: number | null;
};

export const TaskCompletedChart: React.FC<Props> = ({ showAll, importance }) => {
  const { data: completedChart, isLoading } = useCompletedChart(showAll, importance);

  const seriesData =
    completedChart?.map((e) => {
      return {
        id: `completed-${e.completed ? 'true' : 'false'}`,
        value: e.count,
        label: e.completed ? 'Completed' : 'Not Completed',
        color: e.completed ? '#2e7d32' : '#9e9e9e',
      };
    }) ?? [];

  return (
    <Box sx={{ flex: 1, width: '100%', boxSizing: 'border-box' }}>
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
