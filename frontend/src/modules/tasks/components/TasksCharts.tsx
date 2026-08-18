import { TaskCompletedChart } from './TaskCompletedChart';
import { TaskImportanceChart } from './TaskImportanceChart';
import { Box } from '@mui/material';
import { TaskOverdueChart } from './TaskOverdueChart';

type Props = {
  showAll: boolean;
  importance: number | null;
};

export const TasksCharts: React.FC<Props> = ({ showAll, importance }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <TaskCompletedChart showAll={showAll} importance={importance} />
      <TaskOverdueChart showAll={showAll} importance={importance} />
      <TaskImportanceChart showAll={showAll} importance={importance} />
    </Box>
  );
};
