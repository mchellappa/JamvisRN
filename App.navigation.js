import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import WorkoutsScreen from './src/screens/WorkoutsScreen';
import MealsScreen from './src/screens/MealsScreen';
import ProgressScreen from './src/screens/ProgressScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // We'll use custom headers in each screen
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Workouts" component={WorkoutsScreen} />
        <Stack.Screen name="Meals" component={MealsScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
