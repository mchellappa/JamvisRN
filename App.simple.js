import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';

export default function App() {
  const handlePress = (section) => {
    Alert.alert(
      `${section} Selected`,
      `You tapped on ${section}! Navigation will be added in the next version.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        <Text style={styles.title}>🏋️ Jamvis</Text>
        <Text style={styles.subtitle}>Your Fitness Companion</Text>
        <Text style={styles.version}>APK Test Version 1.0</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => handlePress('Workouts')}
          >
            <Text style={styles.buttonText}>🏋️ Workouts</Text>
            <Text style={styles.buttonSubtext}>Track your exercises</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => handlePress('Meals')}
          >
            <Text style={styles.buttonText}>🍽️ Meals</Text>
            <Text style={styles.buttonSubtext}>Log your nutrition</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => handlePress('Progress')}
          >
            <Text style={styles.buttonText}>📈 Progress</Text>
            <Text style={styles.buttonSubtext}>View your stats</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.footer}>APK Build Working! ✅</Text>
        <Text style={styles.debug}>If you see this, the APK is stable</Text>
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
    marginBottom: 10,
  },
  version: {
    fontSize: 14,
    color: '#95a5a6',
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
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  debug: {
    marginTop: 10,
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
  },
});
