import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';

const SAMPLE_WORKOUTS = [
  { id: '1', name: 'Push Day', exercises: 'Bench Press, Shoulder Press, Tricep Dips', duration: '45 min', lastDone: '2 days ago' },
  { id: '2', name: 'Pull Day', exercises: 'Pull-ups, Rows, Bicep Curls', duration: '40 min', lastDone: '3 days ago' },
  { id: '3', name: 'Leg Day', exercises: 'Squats, Deadlifts, Lunges', duration: '50 min', lastDone: '1 week ago' },
  { id: '4', name: 'Cardio', exercises: 'Running, Cycling, Burpees', duration: '30 min', lastDone: 'Yesterday' },
];

export default function WorkoutsScreen({ navigation }) {
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const renderWorkout = ({ item }) => (
    <TouchableOpacity 
      style={[styles.workoutCard, selectedWorkout?.id === item.id && styles.selectedCard]}
      onPress={() => setSelectedWorkout(item)}
    >
      <View style={styles.workoutHeader}>
        <Text style={styles.workoutName}>{item.name}</Text>
        <Text style={styles.duration}>{item.duration}</Text>
      </View>
      <Text style={styles.exercises}>{item.exercises}</Text>
      <Text style={styles.lastDone}>Last done: {item.lastDone}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🏋️ Workouts</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3.2h</Text>
            <Text style={styles.statLabel}>Avg/Week</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your Workouts</Text>
        
        <FlatList
          data={SAMPLE_WORKOUTS}
          renderItem={renderWorkout}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />

        {selectedWorkout && (
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start {selectedWorkout.name} 🚀</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add New Workout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 15,
  },
  backText: {
    fontSize: 16,
    color: '#3498db',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  workoutCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  selectedCard: {
    borderColor: '#3498db',
    borderWidth: 2,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  duration: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
  },
  exercises: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  lastDone: {
    fontSize: 12,
    color: '#95a5a6',
  },
  startButton: {
    backgroundColor: '#e74c3c',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
