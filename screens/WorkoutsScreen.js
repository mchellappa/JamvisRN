import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function WorkoutsScreen({ navigation }) {
  const [workout, setWorkout] = useState(null);
  const username = 'demo'; // Replace with actual user

  useEffect(() => {
    axios.get(`http://localhost:8000/workouts/today?username=${username}`)
      .then(res => setWorkout(res.data))
      .catch(() => setWorkout(null));
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
