import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types/Task';

interface Props {
  task: Task;
  onToggleStatus: (id: string) => void;
  onPress: () => void;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function TaskItem({ task, onToggleStatus, onPress }: Props) {
  const backgroundColor = task.status === 'completed' ? '#888888' : task.color;

  return (
    <TouchableOpacity style={[styles.taskContainer, { backgroundColor }]} onPress={onPress}>
      <View style={styles.flex1}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.time}>{formatDate(task.date)} | {task.time}</Text>
        {task.location ? <Text style={styles.location}>{task.location}</Text> : null}
      </View>

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
