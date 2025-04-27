// screens/EditTaskScreen.tsx
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Task } from '../types/Task';

type EditTaskScreenRouteProp = RouteProp<
  { params: { task: Task; onSave: (task: Task) => void; onDelete: (id: string) => void } },
  'params'
>;

const availableColors = ['#8ca9ff', '#4c9fd4', '#b08bda', '#DA817D'];

export default function EditTaskScreen() {
  const navigation = useNavigation();
  const route = useRoute<EditTaskScreenRouteProp>();
  const { task: originalTask, onSave, onDelete } = route.params;

  const [task, setTask] = useState<Task>({ ...originalTask });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleSave = () => {
    onSave(task);
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {
        onDelete(task.id);
        navigation.goBack();
      }},
    ]);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTask({ ...task, date: selectedDate });
    }
  };

  const handleTimeChange = (event: any, selectedDate?: Date) => {
    setShowTimePicker(false);
    if (selectedDate) {
      const hours = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      const hour12 = hours % 12 || 12;
      const timeString = `${hour12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
      setTask({ ...task, time: timeString });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 顶部 Hi, Victoria + 日期 + 头像 */}
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

      {/* Title背景色变化 */}
      <View style={[styles.titleContainer, { backgroundColor: task.color }]}>
        <TextInput
          style={styles.titleInput}
          value={task.title}
          onChangeText={(text) => setTask({ ...task, title: text })}
          placeholder="Task Title"
        />
      </View>

      {/* 当前日期和时间 */}
      <Text style={styles.label}>Current Date</Text>
      <Text style={styles.valueText}>{task.date.toLocaleDateString('en-US')}</Text>

      <Text style={styles.label}>Current Time</Text>
      <Text style={styles.valueText}>{task.time}</Text>

      {/* 修改按钮 */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.modifyButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.modifyButtonText}>Change Date</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modifyButton} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.modifyButtonText}>Change Time</Text>
        </TouchableOpacity>
      </View>

      {/* 选择颜色 */}
      <Text style={styles.label}>Choose Color</Text>
      <View style={styles.colorRow}>
        {availableColors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorButton,
              { backgroundColor: color },
              task.color === color && styles.selectedColor,
            ]}
            onPress={() => setTask({ ...task, color })}
          />
        ))}
      </View>

      {/* Location */}
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={task.location}
        onChangeText={(text) => setTask({ ...task, location: text })}
      />

      {/* Content */}
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        multiline
        numberOfLines={4}
        value={task.content}
        onChangeText={(text) => setTask({ ...task, content: text })}
        placeholder="Describe your task..."
      />

      {/* Bottom Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'lightgreen' }]} onPress={handleSave}>
          <Ionicons name="checkmark" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'tomato' }]} onPress={handleDelete}>
          <Ionicons name="trash" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'gray' }]} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-undo" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Date and Time Pickers */}
      {showDatePicker && (
        <DateTimePicker
          value={task.date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={task.date}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  titleContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  titleInput: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  valueText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  modifyButton: {
    flex: 1,
    backgroundColor: '#8ca9ff',
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  modifyButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    marginBottom: 20,
  },
  textarea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
