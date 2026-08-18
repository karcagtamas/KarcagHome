import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import type { AccountSummaryDTO } from '../models/account-summary';

type Props = {
  summary: AccountSummaryDTO;
};

export const AccountChart: React.FC<Props> = ({ summary }) => {
  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <LineChart
        series={[
          {
            data: summary.expenses.map((x) => x.amount),
            label: 'Expenses',
            curve: 'linear',
          },
        ]}
        height={300}
        xAxis={[{ scaleType: 'point', data: summary.expenses.map((x) => x.date), height: 28 }]}
        yAxis={[{ width: 60 }]}
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
