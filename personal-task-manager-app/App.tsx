// Entry point of the application.
// Sets up navigation between screens and provides global user context (e.g., avatar URL).

import 'react-native-gesture-handler'; // Required for navigation gestures
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from './screens/TaskListScreen';
import EditTaskScreen from './screens/EditTaskScreen';
import { UserContext } from './contexts/UserContext';
import { useState } from 'react';

// Create a native stack navigator instance
const Stack = createNativeStackNavigator();

export default function App() {
  // Randomly generate an avatar image URL once when the app loads
  const [avatarUrl] = useState(`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`);

  return (
    // Provide the avatar URL to the entire app through context
    <UserContext.Provider value={{ avatarUrl }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskListScreen">
          {/* Task List Screen (main screen) */}
          <Stack.Screen
            name="TaskListScreen"
            component={TaskListScreen}
            options={{ headerShown: false }} // Hide default navigation header
          />
          
          {/* Edit Task Screen (edit or add a task) */}
          <Stack.Screen
            name="EditTaskScreen"
            component={EditTaskScreen}
            options={{ headerShown: false }} // Hide default navigation header
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
