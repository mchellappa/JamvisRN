import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

function App() {
  const [currentScreen, setCurrentScreen] = React.useState('login');
  
  if (currentScreen === 'login') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>JARVIS Fitness</Text>
        <Text style={styles.subtitle}>Your AI Fitness Companion</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={styles.buttonText}>Enter App</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>JARVIS Home</Text>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today's Workout</Text>
          <Text style={styles.cardText}>• Push-ups: 20 reps</Text>
          <Text style={styles.cardText}>• Squats: 30 reps</Text>
          <Text style={styles.cardText}>• Plank: 60 seconds</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Meal Plan</Text>
          <Text style={styles.cardText}>• Breakfast: Oatmeal with berries</Text>
          <Text style={styles.cardText}>• Lunch: Grilled chicken salad</Text>
          <Text style={styles.cardText}>• Dinner: Salmon with vegetables</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Grocery List</Text>
          <Text style={styles.cardText}>• Chicken breast</Text>
          <Text style={styles.cardText}>• Mixed vegetables</Text>
          <Text style={styles.cardText}>• Salmon fillet</Text>
          <Text style={styles.cardText}>• Berries</Text>
        </View>
      </ScrollView>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setCurrentScreen('login')}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001a1a',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#00ffff',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  content: {
    flex: 1,
    marginVertical: 20,
  },
  card: {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00cccc',
  },
  cardTitle: {
    fontSize: 18,
    color: '#00ffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#00cccc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#001a1a',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
