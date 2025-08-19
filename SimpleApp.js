import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

export default function SimpleApp() {
  const handlePress = (screen) => {
    Alert.alert(`Navigate to ${screen}`, `This would open the ${screen} screen in the full version.`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Jamvis</Text>
        <Text style={styles.subtitle}>Health & Fitness Companion</Text>
      </View>
      
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={[styles.menuItem, styles.workoutItem]} 
          onPress={() => handlePress('Workouts')}
        >
          <Text style={styles.menuIcon}>💪</Text>
          <Text style={styles.menuText}>Workouts</Text>
          <Text style={styles.menuDesc}>Track your exercises</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, styles.mealItem]} 
          onPress={() => handlePress('Meals')}
        >
          <Text style={styles.menuIcon}>🍽️</Text>
          <Text style={styles.menuText}>Meals</Text>
          <Text style={styles.menuDesc}>Plan your nutrition</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, styles.groceryItem]} 
          onPress={() => handlePress('Grocery List')}
        >
          <Text style={styles.menuIcon}>🛒</Text>
          <Text style={styles.menuText}>Grocery List</Text>
          <Text style={styles.menuDesc}>Shopping made easy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          This is a simplified version for testing APK build compatibility.
        </Text>
        <Text style={styles.footerText}>
          React Native {require('react-native/package.json').version}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  workoutItem: {
    borderLeftColor: '#FF5722',
    borderLeftWidth: 4,
  },
  mealItem: {
    borderLeftColor: '#4CAF50',
    borderLeftWidth: 4,
  },
  groceryItem: {
    borderLeftColor: '#FF9800',
    borderLeftWidth: 4,
  },
  menuIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  menuText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  menuDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 4,
  },
});
