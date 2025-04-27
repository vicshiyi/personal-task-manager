export type TaskStatus = 'completed' | 'pending';

// types/Task.ts
export interface Task {
  id: string;
  title: string;
  location: string;
  time: string;
  date: Date;
  color: string;
  status: 'pending' | 'completed';
  content: string; // <-- 新增
}

