// Defines the data structure for a Task item used across the application.
// Each task includes information such as title, date, time, location, color, completion status, and description.

/**
 * Represents the possible status values for a task.
 * - 'completed': The task has been finished.
 * - 'pending': The task is yet to be completed.
 */
export type TaskStatus = 'completed' | 'pending';

/**
 * Interface representing a single Task object.
 */
export interface Task {
  id: string;            // Unique identifier for the task
  title: string;         // Title or name of the task
  location: string;      // Location where the task occurs (can be empty)
  time: string;          // Scheduled time (e.g., '9:00 am')
  date: Date;            // Scheduled date
  color: string;         // Background color for UI display
  status: TaskStatus;    // Current status: 'pending' or 'completed'
  content: string;       // Detailed description of the task
}
