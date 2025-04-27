import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import TaskItem from '../components/TaskItem';
import { mockTasks } from '../data/mockTasks';
import { Task } from '../types/Task';

const filters = ['Today', 'Week', 'Month', 'All'] as const;
const tabs = ['Completed', 'Pending'] as const;

type Filter = typeof filters[number];
type Tab = typeof tabs[number];

export default function TaskListScreen() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [activeFilter, setActiveFilter] = useState<Filter>('Today');
  const [activeTab, setActiveTab] = useState<Tab>('Completed');
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safeArea, { paddingBottom: insets.bottom }]}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Hi, Victoria!</Text>
            <Text style={styles.date}>May 1, 2025</Text>
          </View>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100' }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.filterRow}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterButton, activeFilter === f && styles.activeFilter]}
              onPress={() => setActiveFilter(f)}>
              <Text style={[styles.filterText, activeFilter === f && styles.activeFilterText]}>{f}</Text>
              {f === 'Today' && (
                <Text style={[styles.filterSubText, activeFilter === f && styles.activeFilterText]}>May 1</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskItem task={item} />}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>

      <View style={styles.bottomTabContainer}>
        <TouchableOpacity
          style={[styles.bottomTab, activeTab === 'Completed' && styles.activeTab]}
          onPress={() => setActiveTab('Completed')}>
          <Text style={[styles.tabText, activeTab === 'Completed' && styles.activeTabText]}>Completed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addIcon}>＋</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomTab, activeTab === 'Pending' && styles.activeTab]}
          onPress={() => setActiveTab('Pending')}>
          <Text style={[styles.tabText, activeTab === 'Pending' && styles.activeTabText]}>Pending</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#3a3a3a',
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    columnGap: 6,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
  },
  filterText: {
    color: '#444',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  filterSubText: {
    fontSize: 12,
    color: '#444',
    marginTop: 2,
    textAlign: 'center',
  },
  activeFilter: {
    backgroundColor: '#8ca9ff',
  },
  activeFilterText: {
    color: 'white',
  },
  bottomTabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
  },
  bottomTab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tabText: {
    color: '#333',
    fontWeight: '500',
  },
  activeTab: {
    backgroundColor: '#ccc',
  },
  activeTabText: {
    color: 'black',
    fontWeight: '700',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8ca9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  addIcon: {
    fontSize: 28,
    color: 'white',
  },
});
