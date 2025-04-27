// Displays a list of tasks organized by date, time, and completion status.
// Supports filtering tasks by Today, Week, Month, or All, and toggling between Completed and Pending tabs.
// Allows users to add new tasks, edit existing tasks, or toggle task status.

import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import TaskItem from '../components/TaskItem';
import { mockTasks } from '../data/mockTasks';
import { Task } from '../types/Task';

// Filter options
const filters = ['Today', 'Week', 'Month', 'All'] as const;
// Tabs for Completed or Pending tasks
const tabs = ['Completed', 'Pending'] as const;

type Filter = typeof filters[number];
type Tab = typeof tabs[number];

/**
 * Check if a given date is today.
 */
function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}

/**
 * Check if a given date falls within this week (Monday to Sunday).
 */
function isThisWeek(date: Date): boolean {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return date >= startOfWeek && date <= endOfWeek;
}

/**
 * Check if a given date falls within the current month.
 */
function isThisMonth(date: Date): boolean {
  const today = new Date();
  return date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}

/**
 * Compare two time strings (e.g., '9:00 am', '2:30 pm').
 * Used to sort tasks within the same day.
 */
function compareTime(t1: string, t2: string): number {
  const parse = (time: string) => {
    const match = time.match(/(\d+):(\d+)\s*(am|pm)/i);
    if (!match) return 0;
    let [_, h, m, ampm] = match;
    let hours = parseInt(h);
    const minutes = parseInt(m);
    if (ampm.toLowerCase() === 'pm' && hours !== 12) hours += 12;
    if (ampm.toLowerCase() === 'am' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };
  return parse(t1) - parse(t2);
}

/**
 * Sort a list of tasks first by date, then by time.
 */
function sortTasks(tasks: Task[]): Task[] {
  return tasks.sort((a, b) => {
    if (a.date.getTime() !== b.date.getTime()) {
      return a.date.getTime() - b.date.getTime();
    }
    return compareTime(a.time, b.time);
  });
}

/**
 * Get subtitle under filter buttons (Today/Week/Month) dynamically.
 */
function getFilterSubtitle(filter: Filter): string {
  const today = new Date();
  if (filter === 'Today') {
    return today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  if (filter === 'Week') {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const startStr = startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${startStr} - ${endStr}`;
  }
  if (filter === 'Month') {
    return today.toLocaleDateString('en-US', { month: 'long' });
  }
  return '';
}

export default function TaskListScreen() {
  const [tasks, setTasks] = useState<Task[]>(sortTasks(mockTasks)); // 初始也排好
  const [activeFilter, setActiveFilter] = useState<Filter>('Today');
  const [activeTab, setActiveTab] = useState<Tab>('Completed');
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  /**
   * Toggle the completion status of a task.
   */
  const handleToggleStatus = (id: string) => {
    setTasks(prevTasks =>
      sortTasks(
        prevTasks.map(task =>
          task.id === id
            ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
            : task
        )
      )
    );
  };

  /**
   * Navigate to EditTaskScreen to edit an existing task or add a new task.
   */
  const handleEditTask = (task: Task, isNew = false) => {
    navigation.navigate('EditTaskScreen', {
      task,
      onSave: (updatedTask: Task) => {
        setTasks(prevTasks => {
          let updatedTasks;
          if (isNew) {
            updatedTasks = [...prevTasks, updatedTask];
          } else {
            updatedTasks = prevTasks.map(t => (t.id === updatedTask.id ? updatedTask : t));
          }
          return sortTasks(updatedTasks); // ✅ 保存后排序
        });
      },
      onDelete: (id: string) => {
        setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
      },
    });
  };

  /**
   * Initialize and navigate to add a new blank task.
   */
  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: '',
      time: '9:00 am',
      location: '',
      completed: false,
      color: '#8ca9ff',
      status: 'pending',
      date: new Date(),
      content: '',
    };
    handleEditTask(newTask, true);
  };

  // Filter tasks based on active tab and filter
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'Completed' && task.status !== 'completed') return false;
    if (activeTab === 'Pending' && task.status !== 'pending') return false;
    if (activeFilter === 'Today') return isToday(task.date);
    if (activeFilter === 'Week') return isThisWeek(task.date);
    if (activeFilter === 'Month') return isThisMonth(task.date);
    return true;
  });
  

  return (
    
    <SafeAreaView style={[styles.safeArea, { paddingBottom: insets.bottom }]}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Hi, Victoria!</Text>
            <Text style={styles.date}>{formattedToday}</Text>
          </View>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            style={styles.avatar}
          />
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterRow}>
          {filters.map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterButton, activeFilter === f && styles.activeFilter]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.activeFilterText]}>{f}</Text>
              <Text style={[styles.filterSubText, activeFilter === f && styles.activeFilterText]}>
                {getFilterSubtitle(f)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Task List */}
        <FlatList
          data={filteredTasks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggleStatus={handleToggleStatus}
              onPress={() => handleEditTask(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
          ListEmptyComponent={<Text style={styles.emptyText}>No tasks to show.</Text>}
        />
      </View>

      {/* Bottom Tabs */}
      <View style={styles.bottomTabContainer}>
        <TouchableOpacity
          style={[styles.bottomTab, activeTab === 'Completed' ? styles.activeCompletedTab : styles.inactiveTab]}
          onPress={() => setActiveTab('Completed')}
        >
          <Text style={[styles.tabText, activeTab === 'Completed' ? styles.activeCompletedTabText : styles.inactiveTabText]}>
            Completed
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addIcon}>＋</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomTab, activeTab === 'Pending' ? styles.activePendingTab : styles.inactiveTab]}
          onPress={() => setActiveTab('Pending')}
        >
          <Text style={[styles.tabText, activeTab === 'Pending' ? styles.activePendingTabText : styles.inactiveTabText]}>
            Pending
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 24, paddingBottom: 20, backgroundColor: 'white' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  greeting: { fontSize: 28, fontWeight: 'bold', marginBottom: 4, color: '#3a3a3a' },
  date: { fontSize: 16, color: '#666' },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, columnGap: 6 },
  filterButton: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#eee', borderRadius: 14, alignItems: 'center', justifyContent: 'center', minWidth: 70 },
  filterText: { color: '#444', fontWeight: '600', fontSize: 14, textAlign: 'center' },
  filterSubText: { fontSize: 12, color: '#444', marginTop: 2, textAlign: 'center' },
  activeFilter: { backgroundColor: '#8ca9ff' },
  activeFilterText: { color: 'white' },
  bottomTabContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', height: 60, paddingHorizontal: 20, borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor: '#fff', justifyContent: 'space-around', alignItems: 'center', paddingBottom: Platform.OS === 'ios' ? 10 : 0 },
  bottomTab: { flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' },
  activeCompletedTab: { backgroundColor: '#555' },
  activeCompletedTabText: { color: 'white', fontWeight: '700' },
  activePendingTab: { backgroundColor: '#eee' },
  activePendingTabText: { color: '#666', fontWeight: '700' },
  inactiveTab: { backgroundColor: '#fff' },
  inactiveTabText: { color: '#666', fontWeight: '500' },
  tabText: { fontSize: 16 },
  addButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#8ca9ff', justifyContent: 'center', alignItems: 'center', marginHorizontal: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, elevation: 3 },
  addIcon: { fontSize: 28, color: 'white' },
  emptyText: { marginTop: 20, textAlign: 'center', color: '#999' },
});
