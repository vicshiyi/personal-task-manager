// components/TaskItem.tsx
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types/Task';

interface Props {
  task: Task;
}

export default function TaskItem({ task }: Props) {
  return (
    <View style={[styles.taskContainer, { backgroundColor: task.color }]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.time}>{task.time}</Text>
        {task.location && <Text style={styles.location}>{task.location}</Text>}
      </View>
      <View style={styles.iconGroup}>
        <Ionicons
          name="checkmark-circle"
          size={28}
          color={task.completed ? 'lightgreen' : 'gray'}
          style={styles.icon}
        />
        <Ionicons name="create" size={24} color="lightgray" style={styles.icon} />
      </View>
    </View>
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  time: {
    fontSize: 14,
    color: 'white',
  },
  location: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'white',
  },
  iconGroup: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  icon: {
    marginVertical: 4,
  },
});
