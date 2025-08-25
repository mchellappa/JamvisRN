import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🏋️ Jamvis</Text>
        <Text style={styles.subtitle}>Your Fitness Companion</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Workouts')}
          >
            <Text style={styles.buttonText}>🏋️ Workouts</Text>
            <Text style={styles.buttonSubtext}>Track your exercises</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Meals')}
          >
            <Text style={styles.buttonText}>🍽️ Meals</Text>
            <Text style={styles.buttonSubtext}>Log your nutrition</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Progress')}
          >
            <Text style={styles.buttonText}>📈 Progress</Text>
            <Text style={styles.buttonSubtext}>View your stats</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.footer}>Let's get stronger! 💪</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 15,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  buttonSubtext: {
    color: '#ecf0f1',
    fontSize: 14,
  },
  footer: {
    marginTop: 40,
    fontSize: 16,
    color: '#95a5a6',
  },
});
