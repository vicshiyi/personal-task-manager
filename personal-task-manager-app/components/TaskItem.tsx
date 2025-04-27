// A reusable component to display a single task item with its title, date, time, location, and status toggle button.
// This component supports tapping the task to edit and toggling its completed/pending status.
// The background color dynamically reflects the task's current status.

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types/Task';

interface Props {
  task: Task;                          // Task object to render
  onToggleStatus: (id: string) => void; // Handler to toggle task status between pending/completed
  onPress: () => void;                  // Handler when the task is tapped (navigate to edit)
}

/**
 * Format the given Date object into a readable string (e.g., "May 5, 2025").
 * @param date - Date to format
 * @returns Formatted date string
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function TaskItem({ task, onToggleStatus, onPress }: Props) {
  // Determine background color based on task status
  const backgroundColor = task.status === 'completed' ? '#888888' : task.color;

  return (
    <TouchableOpacity
      style={[styles.taskContainer, { backgroundColor }]}
      onPress={onPress}
    >
      <View style={styles.flex1}>
        {/* Task title */}
        <Text style={styles.title}>{task.title}</Text>

        {/* Date and Time */}
        <Text style={styles.time}>
          {formatDate(task.date)} | {task.time}
        </Text>

        {/* Optional location */}
        {task.location ? (
          <Text style={styles.location}>{task.location}</Text>
        ) : null}
      </View>

      {/* Status toggle icon */}
      <TouchableOpacity onPress={() => onToggleStatus(task.id)}>
        <Ionicons
          name={task.status === 'pending' ? 'checkmark-circle' : 'close-circle'}
          size={30}
          color={task.status === 'pending' ? 'lightgreen' : 'tomato'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  flex1: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  time: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'white',
    marginTop: 2,
  },
});
