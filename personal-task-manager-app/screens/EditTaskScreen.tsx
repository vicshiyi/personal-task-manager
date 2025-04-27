import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Task } from '../types/Task';

type EditTaskScreenRouteProp = RouteProp<
  { params: { task: Task; onSave: (task: Task) => void; onDelete: (id: string) => void } },
  'params'
>;

export default function EditTaskScreen() {
  const navigation = useNavigation();
  const route = useRoute<EditTaskScreenRouteProp>();
  const { task: originalTask, onSave, onDelete } = route.params;

  const [task, setTask] = useState<Task>({...originalTask});

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.header, { backgroundColor: task.color }]}>
        <Text style={styles.headerText}>{task.title}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={task.location}
          onChangeText={(text) => setTask({ ...task, location: text })}
        />

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          multiline
          numberOfLines={4}
          value={task.description || ''}
          onChangeText={(text) => setTask({ ...task, description: text })}
          placeholder="Describe your task..."
        />

        <View style={styles.buttonRow}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
  },
  textarea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-around',
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
