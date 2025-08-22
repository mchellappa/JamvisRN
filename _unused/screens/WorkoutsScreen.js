import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WorkoutsScreen({ navigation }) {
  const [workout, setWorkout] = useState(null);
  const username = 'demo'; // Replace with actual user

  useEffect(() => {
    AsyncStorage.getItem('user').then((savedUser) => {
      const user = savedUser || username;
      axios.get(`http://localhost:8000/workouts/today?username=${user}`)
        .then(res => {
          setWorkout(res.data);
          AsyncStorage.setItem('workout_today', JSON.stringify(res.data)); // Save workout locally
        })
        .catch(() => {
          // Try to load from local storage if network fails
          AsyncStorage.getItem('workout_today').then((localWorkout) => {
            if (localWorkout) setWorkout(JSON.parse(localWorkout));
            else setWorkout(null);
          });
        });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Workout</Text>
      {workout ? (
        <View>
          <Text>Type: {workout.workout}</Text>
          <FlatList
            data={workout.exercises}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => (
              <Text>{item.name} - Sets: {item.sets} Reps: {item.reps}</Text>
            )}
          />
        </View>
      ) : (
        <Text>No workout found for today.</Text>
      )}
      <Button title="Upload Workout" onPress={() => navigation.navigate('Meals')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
});
