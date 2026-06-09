export interface TaskDTO {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  importance: number;
}

export interface TaskEditDTO {
  title: string;
  description: string | null;
  importance: number;
}

export const IMPORTANCE_LEVELS: Record<number, { value: number; displayText: string; bgColor: string, fgColor: string, }> = {
  [0]: {
    value: 0,
    displayText: 'Not Important',
    bgColor: '#def7ff',
    fgColor: '#19beff',
  },
  [1]: {
    value: 1,
    displayText: 'Normal',
    bgColor: '#ffe8c2',
    fgColor: '#fcaf35',
  },
  [2]: {
    value: 2,
    displayText: 'Important',
    bgColor: '#ffd1c0',
    fgColor: '#ff6730',
  },
};
