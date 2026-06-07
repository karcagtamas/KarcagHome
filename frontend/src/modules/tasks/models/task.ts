export interface TaskDTO {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
}

export interface TaskEditDTO {
  title: string;
  description: string | null;
}
