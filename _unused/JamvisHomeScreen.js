import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Simple data manager
const DataManager = {
  getDefaultWOD: function(date) {
    return {
      id: 'default-wod-1',
      date: date,
      title: 'Daily Workout',
      description: 'Simple bodyweight exercises',
      estimatedDuration: 20,
      exercises: [
        {
          id: 'ex1',
          name: 'Push-ups',
          sets: 3,
          reps: 10,
          instructions: 'Keep your body straight'
        },
        {
          id: 'ex2',
          name: 'Squats',
          sets: 3,
          reps: 15,
          instructions: 'Keep your back straight'
        }
      ]
    };
  },

  getDefaultMealPlan: function(date) {
    return {
      id: 'default-meal-plan',
      date: date,
      meals: [
        {
          id: 'breakfast',
          type: 'breakfast',
          time: '7:00 AM',
          items: [
            {
              id: 'f1',
              name: 'Oatmeal',
              calories: 300
            }
          ],
          totalCalories: 300
        },
        {
          id: 'lunch',
          type: 'lunch',
          time: '12:00 PM',
          items: [
            {
              id: 'f2',
              name: 'Chicken Salad',
              calories: 400
            }
          ],
          totalCalories: 400
        }
      ],
      totalDailyCalories: 700
    };
  },

  getDailyData: async function(date) {
    try {
      const key = `daily_data_${date}`;
      const data = await AsyncStorage.getItem(key);
      
      if (data) {
        return JSON.parse(data);
      } else {
        const defaultData = {
          date: date,
          wod: this.getDefaultWOD(date),
          mealPlan: this.getDefaultMealPlan(date)
        };
        await AsyncStorage.setItem(key, JSON.stringify(defaultData));
        return defaultData;
      }
    } catch (error) {
      console.error('Error getting daily data:', error);
      return {
        date: date,
        wod: this.getDefaultWOD(date),
        mealPlan: this.getDefaultMealPlan(date)
      };
    }
  }
};

function JamvisHomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyData, setDailyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    wod: false,
    meals: false
  });

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await DataManager.getDailyData(selectedDate);
      setDailyData(data);
    } catch (error) {
      Alert.alert('Error', 'Could not load data');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (isLoading || !dailyData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadData} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Jamvis</Text>
          <Text style={styles.subtitle}>Health & Fitness</Text>
        </View>

        <TouchableOpacity 
          style={styles.sectionCard}
          onPress={() => toggleSection('wod')}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>💪 Today's Workout</Text>
            <Text style={styles.expandIcon}>
              {expandedSections.wod ? '−' : '+'}
            </Text>
          </View>
          <Text style={styles.sectionSubtitle}>{dailyData.wod.title}</Text>
          <Text style={styles.estimatedTime}>
            ~{dailyData.wod.estimatedDuration} minutes
          </Text>
        </TouchableOpacity>

        {expandedSections.wod && (
          <View style={styles.wodDetails}>
            {dailyData.wod.exercises.map((exercise, index) => (
              <View key={exercise.id} style={styles.exerciseCard}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetails}>
                  {exercise.sets} sets × {exercise.reps} reps
                </Text>
                <Text style={styles.instructions}>{exercise.instructions}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity 
          style={styles.sectionCard}
          onPress={() => toggleSection('meals')}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🍽️ Today's Meals</Text>
            <Text style={styles.expandIcon}>
              {expandedSections.meals ? '−' : '+'}
            </Text>
          </View>
          <Text style={styles.sectionSubtitle}>
            {dailyData.mealPlan.totalDailyCalories} calories planned
          </Text>
        </TouchableOpacity>

        {expandedSections.meals && (
          <View style={styles.mealDetails}>
            {dailyData.mealPlan.meals.map((meal) => (
              <View key={meal.id} style={styles.mealCard}>
                <Text style={styles.mealTitle}>
                  {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
                </Text>
                <Text style={styles.mealTime}>{meal.time}</Text>
                <Text style={styles.mealCalories}>{meal.totalCalories} calories</Text>
                {meal.items.map(item => (
                  <Text key={item.id} style={styles.foodItem}>
                    • {item.name} ({item.calories} cal)
                  </Text>
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
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
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  expandIcon: {
    fontSize: 24,
    color: '#3498db',
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 4,
  },
  estimatedTime: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  wodDetails: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  instructions: {
    fontSize: 13,
    color: '#7f8c8d',
    fontStyle: 'italic',
    marginTop: 4,
  },
  mealDetails: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  mealTime: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  mealCalories: {
    fontSize: 14,
    color: '#e67e22',
    fontWeight: '600',
  },
  foodItem: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 2,
  },
});

export default JamvisHomeScreen;
