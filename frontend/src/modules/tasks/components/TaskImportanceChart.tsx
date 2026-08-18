import { Box, useTheme } from '@mui/material';
import { LoadingBox } from '../../../components/common/LoadingBox';
import { useImportanceChart } from '../hooks/useImportanceChart';
import { IMPORTANCE_LEVELS } from '../models/task';
import { PieChart } from '@mui/x-charts';
import { getPaletteByTheme } from '../../../common/colors';

type Props = {
  showAll: boolean;
  importance: number | null;
};

export const TaskImportanceChart: React.FC<Props> = ({ showAll, importance }) => {
  const theme = useTheme();
  const { data: importanceChart, isLoading } = useImportanceChart(showAll, importance);

  const seriesData =
    importanceChart?.map((e) => {
      const levelInfo = IMPORTANCE_LEVELS[e.importance];
      const colors = getPaletteByTheme(levelInfo.colors, theme);

      return {
        id: `level-${e.importance}`,
        value: e.count,
        label: levelInfo.displayText,
        color: colors.fgColor || '#ccc',
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
