// screens/TaskListScreen.tsx
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';
import TaskItem from '../components/TaskItem';
import { mockTasks } from '../data/mockTasks';
import { Task } from '../types/Task';

export default function TaskListScreen() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, Victoria!</Text>
      <Text style={styles.date}>May 1, 2025</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#3a3a3a',
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
});
