import { Box } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import type { AccountSummaryDTO } from '../models/account-summary';

type Props = {
  summary: AccountSummaryDTO;
};

export const AccountCategoryTypesChart: React.FC<Props> = ({ summary }) => {
  const seriesData =
    summary?.categoryTypes.map((e) => {
      return {
        id: `acc-cat-type-${e.categoryType.id}`,
        value: e.amount,
        label: `${e.categoryType.name} [${e.amount}]`,
        color: e.categoryType.color,
      };
    }) ?? [];

  return (
    <Box sx={{ flex: 1, width: '100%' }}>
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
        height={200}
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
