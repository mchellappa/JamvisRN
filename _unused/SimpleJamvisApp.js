import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SimpleJamvisApp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Jamvis</Text>
        <Text style={styles.subtitle}>Health & Fitness App</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💪 Today's Workout</Text>
          <Text style={styles.cardText}>Push-ups: 3 sets × 10 reps</Text>
          <Text style={styles.cardText}>Squats: 3 sets × 15 reps</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🍽️ Meals</Text>
          <Text style={styles.cardText}>Breakfast: Oatmeal (300 cal)</Text>
          <Text style={styles.cardText}>Lunch: Chicken Salad (400 cal)</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Offline Mode Ready</Text>
      </View>
    </View>
  );
};

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
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 8,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: '600',
  },
});

export default SimpleJamvisApp;
