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

export const IMPORTANCE_LEVELS: Record<number, { value: number; displayText: string }> = {
  [0]: {
    value: 0,
    displayText: 'Not Important',
  },
  [1]: {
    value: 1,
    displayText: 'Normal',
  },
  [2]: {
    value: 2,
    displayText: 'Important',
  },
};
