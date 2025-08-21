import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import WorkoutsScreen from './screens/WorkoutsScreen';
import MealsScreen from './screens/MealsScreen';
import GroceryListScreen from './screens/GroceryListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#001a1a' },
          headerTintColor: '#00ffff',
          headerTitleStyle: { fontWeight: 'bold' },
          cardStyle: { backgroundColor: '#001a1a' },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Workouts" component={WorkoutsScreen} />
        <Stack.Screen name="Meals" component={MealsScreen} />
        <Stack.Screen name="GroceryList" component={GroceryListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
