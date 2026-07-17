import type { ThemeColors } from '../../../common/colors';

export interface TaskDTO {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  importance: number;
  dueDate: string;
}

export interface TaskEditDTO {
  title: string;
  description: string | null;
  importance: number;
  dueDate: string;
}

export const IMPORTANCE_LEVELS: Record<number, { value: number; displayText: string; colors: ThemeColors }> = {
  [0]: {
    value: 0,
    displayText: 'Not Important',
    colors: {
      light: {
        bgColor: '#c7ecf8',
        fgColor: '#0c8dc0',
      },
      dark: {
        bgColor: '#10698b',
        fgColor: '#85c1d4',
      },
    },
  },
  [1]: {
    value: 1,
    displayText: 'Normal',
    colors: {
      light: {
        bgColor: '#ffecc2',
        fgColor: '#be7909',
      },
      dark: {
        bgColor: '#be7909',
        fgColor: '#ffdd94',
      },
    },
  },
  [2]: {
    value: 2,
    displayText: 'Important',
    colors: {
      light: {
        bgColor: '#fcdbd1',
        fgColor: '#d64510',
      },
      dark: {
        bgColor: '#b1390d',
        fgColor: '#e2b3a4',
      },
    },
  },
};

export interface TaskCompletedChartDTO {
  completed: boolean;
  count: number;
}

export interface TaskImportanceChartDTO {
  importance: number;
  count: number;
}
