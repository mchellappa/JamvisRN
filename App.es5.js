/**
 * Simple React Native app with standard imports
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  
  function handlePress() {
    if (currentScreen === 'login') {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('login');
    }
  }
  
  if (currentScreen === 'login') {
    return React.createElement(View, { style: styles.container },
      React.createElement(Text, { style: styles.title }, 'JARVIS Fitness'),
      React.createElement(Text, { style: styles.subtitle }, 'Your AI Fitness Companion'),
      React.createElement(TouchableOpacity, { style: styles.button, onPress: handlePress },
        React.createElement(Text, { style: styles.buttonText }, 'Enter App')
      )
    );
  }
  
  return React.createElement(View, { style: styles.container },
    React.createElement(Text, { style: styles.title }, 'JARVIS Home'),
    React.createElement(View, { style: styles.card },
      React.createElement(Text, { style: styles.cardTitle }, 'Today\'s Workout'),
      React.createElement(Text, { style: styles.cardText }, '• Push-ups: 20 reps'),
      React.createElement(Text, { style: styles.cardText }, '• Squats: 30 reps'),
      React.createElement(Text, { style: styles.cardText }, '• Plank: 60 seconds')
    ),
    React.createElement(View, { style: styles.card },
      React.createElement(Text, { style: styles.cardTitle }, 'Meal Plan'),
      React.createElement(Text, { style: styles.cardText }, '• Breakfast: Oatmeal with berries'),
      React.createElement(Text, { style: styles.cardText }, '• Lunch: Grilled chicken salad'),
      React.createElement(Text, { style: styles.cardText }, '• Dinner: Salmon with vegetables')
    ),
    React.createElement(TouchableOpacity, { style: styles.button, onPress: handlePress },
      React.createElement(Text, { style: styles.buttonText }, 'Back to Login')
    )
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001a1a',
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    color: '#00ffff',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30
  },
  card: {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00cccc'
  },
  cardTitle: {
    fontSize: 18,
    color: '#00ffff',
    fontWeight: 'bold',
    marginBottom: 10
  },
  cardText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5
  },
  button: {
    backgroundColor: '#00cccc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#001a1a',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default App;
