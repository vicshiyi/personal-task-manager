// App.tsx
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from './screens/TaskListScreen';
import EditTaskScreen from './screens/EditTaskScreen';
import { UserContext } from './contexts/UserContext';
import { useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [avatarUrl] = useState(`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`);

  return (
    <UserContext.Provider value={{ avatarUrl }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskListScreen">
          <Stack.Screen name="TaskListScreen" component={TaskListScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditTaskScreen" component={EditTaskScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}



// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
