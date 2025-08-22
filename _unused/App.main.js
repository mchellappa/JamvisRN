import React, { useState } from 'react';
import { View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import WorkoutsScreen from './screens/WorkoutsScreen';
import MealsScreen from './screens/MealsScreen';
import GroceryListScreen from './screens/GroceryListScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [user, setUser] = useState(null);

  const navigate = (screenName, params = {}) => {
    if (params.user) {
      setUser(params.user);
    }
    setCurrentScreen(screenName);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Login':
        return <LoginScreen navigation={{ navigate }} />;
      case 'Workouts':
        return <WorkoutsScreen navigation={{ navigate }} user={user} />;
      case 'Meals':
        return <MealsScreen navigation={{ navigate }} user={user} />;
      case 'GroceryList':
        return <GroceryListScreen navigation={{ navigate }} user={user} />;
      default:
        return <LoginScreen navigation={{ navigate }} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#001a1a' }}>
      {renderScreen()}
    </View>
  );
}
