export type TaskStatus = 'completed' | 'pending';

export interface Task {
  id: string;
  title: string;
  time: string;
  location?: string;
  completed: boolean;
  color: string;
  status: TaskStatus;
  date: Date; 
}
