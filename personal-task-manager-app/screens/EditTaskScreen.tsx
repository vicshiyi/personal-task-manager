// screens/EditTaskScreen.tsx
//
// Provides a screen for creating or editing a task.
// Supports modifying title, date, time, location, color, and content.
// Also supports deleting tasks, saving changes, and navigating back.
// Uses DateTimePicker modal for selecting date and time.

import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, Platform, Modal, Button, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../contexts/UserContext';
import { Task } from '../types/Task';

// Define route prop types
type EditTaskScreenRouteProp = RouteProp<
  { params: { task: Task; onSave: (task: Task) => void; onDelete: (id: string) => void } },
  'params'
>;

// List of available colors for tasks
const availableColors = ['#8ca9ff', '#4c9fd4', '#b08bda', '#DA817D'];

export default function EditTaskScreen() {
  const navigation = useNavigation();
  const route = useRoute<EditTaskScreenRouteProp>();
  const { task: originalTask, onSave, onDelete } = route.params;
  const { avatarUrl } = useUser();

  const [task, setTask] = useState<Task>({ ...originalTask });
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState(task.date);
  const [tempTime, setTempTime] = useState(task.date);

  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  /**
   * Save current task changes and navigate back.
   */
  const handleSave = () => {
    onSave(task);
    navigation.goBack();
  };

  /**
   * Confirm and delete the current task.
   */
  const handleDelete = () => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => {
        onDelete(task.id);
        navigation.goBack();
      }},
    ]);
  };

  /**
   * Confirm the selected date from DateTimePicker.
   */
  const onConfirmDate = () => {
    setTask({ ...task, date: tempDate });
    setIsDateModalVisible(false);
  };

  /**
   * Confirm the selected time from DateTimePicker.
   */
  const onConfirmTime = () => {
    const hours = tempTime.getHours();
    const minutes = tempTime.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const hour12 = hours % 12 || 12;
    const timeString = `${hour12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    setTask({ ...task, time: timeString });
    setIsTimeModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 2, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Top Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Hi, Victoria!</Text>
            <Text style={styles.date}>{formattedToday}</Text>
          </View>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        </View>

        {/* Title input with background color */}
        <View style={[styles.titleContainer, { backgroundColor: task.color }]}>
          <TextInput
            style={styles.titleInput}
            value={task.title}
            onChangeText={(text) => setTask({ ...task, title: text })}
            placeholder="Task Title"
          />
        </View>

        {/* Content Block: Date, Time, Color, Location, Content */}
        <View style={styles.contentBlock}>

          {/* Date selection */}
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity onPress={() => { setTempDate(task.date); setIsDateModalVisible(true); }}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputText}>{task.date.toLocaleDateString('en-US')}</Text>
            </View>
          </TouchableOpacity>

          {/* Time selection */}
          <Text style={styles.label}>Time</Text>
          <TouchableOpacity onPress={() => { setTempTime(task.date); setIsTimeModalVisible(true); }}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputText}>{task.time}</Text>
            </View>
          </TouchableOpacity>

          {/* Color selection */}
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

          {/* Location input */}
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={task.location}
            onChangeText={(text) => setTask({ ...task, location: text })}
          />

          {/* Content input */}
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            multiline
            numberOfLines={4}
            value={task.content}
            onChangeText={(text) => setTask({ ...task, content: text })}
            placeholder="Describe your task..."
          />

          {/* Action Buttons: Save, Delete, Cancel */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'lightgreen' }]} onPress={handleSave}>
              <Ionicons name="checkmark" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'tomato' }]} onPress={handleDelete}>
              <Ionicons name="trash" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'gray' }]} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-undo" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Date picker modal */}
        <Modal visible={isDateModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker value={tempDate} mode="date" display="default" onChange={(event, selectedDate) => setTempDate(selectedDate || tempDate)} />
              <View style={styles.modalButtonRow}>
                <Button title="Cancel" onPress={() => setIsDateModalVisible(false)} />
                <Button title="OK" onPress={onConfirmDate} />
              </View>
            </View>
          </View>
        </Modal>

        {/* Time picker modal */}
        <Modal visible={isTimeModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker value={tempTime} mode="time" display="default" onChange={(event, selectedTime) => setTempTime(selectedTime || tempTime)} />
              <View style={styles.modalButtonRow}>
                <Button title="Cancel" onPress={() => setIsTimeModalVisible(false)} />
                <Button title="OK" onPress={onConfirmTime} />
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: 'white', flexGrow: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  date: { fontSize: 16, color: '#666' },
  titleContainer: { borderRadius: 16, padding: 16, marginBottom: 20 },
  titleInput: { fontSize: 22, fontWeight: '700', color: 'white' },
  contentBlock: { backgroundColor: '#EEEEEE', padding: 16, borderRadius: 16, borderColor: '#999', borderWidth: 1, marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 10 },
  inputWrapper: { borderWidth: 1, borderColor: '#ccc', backgroundColor: 'white', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 12, marginTop: 6, marginBottom: 10 },
  inputText: { fontSize: 16, color: '#333' },
  colorRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  colorButton: { width: 60, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  selectedColor: { borderWidth: 3, borderColor: '#000' },
  input: { borderWidth: 1, borderColor: '#ccc', backgroundColor: 'white', borderRadius: 8, padding: 10, marginTop: 6, marginBottom: 20 },
  textarea: { minHeight: 100, textAlignVertical: 'top' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  actionButton: { backgroundColor: '#ccc', width: 100, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', margin: 20, borderRadius: 10, padding: 20, alignItems: 'center' },
  modalButtonRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10 },
});
