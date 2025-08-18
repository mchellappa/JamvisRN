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

// Offline Data Manager
class OfflineDataManager {
  static getDefaultWOD(date) {
    const workouts = [
      {
        id: 'default-wod-1',
        title: 'Full Body Strength',
        description: 'Complete bodyweight workout targeting all major muscle groups',
        estimatedDuration: 25,
        exercises: [
          {
            id: 'ex1',
            name: 'Push-ups',
            sets: 3,
            reps: 12,
            restTime: 60,
            instructions: 'Keep core tight, full range of motion',
            muscleGroups: ['Chest', 'Triceps'],
            difficulty: 'beginner'
          },
          {
            id: 'ex2',
            name: 'Bodyweight Squats',
            sets: 3,
            reps: 15,
            restTime: 60,
            instructions: 'Keep knees over toes, chest up',
            muscleGroups: ['Legs', 'Glutes'],
            difficulty: 'beginner'
          },
          {
            id: 'ex3',
            name: 'Plank',
            sets: 3,
            duration: 30,
            restTime: 60,
            instructions: 'Hold straight line from head to heels',
            muscleGroups: ['Core'],
            difficulty: 'beginner'
          }
        ],
        warmup: [
          {
            id: 'w1',
            name: 'Arm Circles',
            sets: 1,
            duration: 30,
            restTime: 0,
            instructions: 'Forward and backward circles',
            muscleGroups: ['Shoulders'],
            difficulty: 'beginner'
          }
        ],
        cooldown: [
          {
            id: 'c1',
            name: 'Full Body Stretch',
            sets: 1,
            duration: 300,
            restTime: 0,
            instructions: 'Hold each stretch for 30 seconds',
            muscleGroups: ['Full Body'],
            difficulty: 'beginner'
          }
        ],
        equipment: ['None - Bodyweight Only'],
        targetMuscleGroups: ['Full Body']
      },
      {
        id: 'default-wod-2',
        title: 'Cardio Blast',
        description: 'High intensity cardio and core workout',
        estimatedDuration: 20,
        exercises: [
          {
            id: 'ex4',
            name: 'Jumping Jacks',
            sets: 3,
            duration: 45,
            restTime: 60,
            instructions: 'Land softly, maintain rhythm',
            muscleGroups: ['Full Body'],
            difficulty: 'beginner'
          },
          {
            id: 'ex5',
            name: 'Mountain Climbers',
            sets: 3,
            duration: 30,
            restTime: 60,
            instructions: 'Keep hips level, fast alternating legs',
            muscleGroups: ['Core', 'Shoulders'],
            difficulty: 'intermediate'
          },
          {
            id: 'ex6',
            name: 'Burpees',
            sets: 3,
            reps: 8,
            restTime: 90,
            instructions: 'Full range, explosive movement',
            muscleGroups: ['Full Body'],
            difficulty: 'intermediate'
          }
        ],
        warmup: [],
        cooldown: [],
        equipment: ['None - Bodyweight Only'],
        targetMuscleGroups: ['Cardio', 'Core']
      }
    ];

    const dayIndex = new Date(date).getDay();
    const selectedWorkout = workouts[dayIndex % workouts.length];
    
    return {
      ...selectedWorkout,
      date
    };
  }

  static getDefaultMealPlan(date) {
    return {
      id: 'default-meal-plan',
      date,
      meals: [
        {
          id: 'breakfast',
          type: 'breakfast',
          time: '7:00 AM',
          items: [
            {
              id: 'f1',
              name: 'Oatmeal with Banana',
              calories: 300,
              protein: 8,
              carbs: 58,
              fats: 6,
              servingSize: '1 cup'
            },
            {
              id: 'f2',
              name: 'Greek Yogurt',
              calories: 100,
              protein: 17,
              carbs: 6,
              fats: 0,
              servingSize: '1 container'
            }
          ],
          totalCalories: 400,
          prepTime: 5
        },
        {
          id: 'lunch',
          type: 'lunch',
          time: '12:00 PM',
          items: [
            {
              id: 'f3',
              name: 'Grilled Chicken Salad',
              calories: 350,
              protein: 30,
              carbs: 15,
              fats: 20,
              servingSize: '1 large bowl'
            },
            {
              id: 'f4',
              name: 'Whole Grain Roll',
              calories: 150,
              protein: 5,
              carbs: 28,
              fats: 3,
              servingSize: '1 roll'
            }
          ],
          totalCalories: 500,
          prepTime: 15
        },
        {
          id: 'dinner',
          type: 'dinner',
          time: '6:00 PM',
          items: [
            {
              id: 'f5',
              name: 'Baked Salmon',
              calories: 250,
              protein: 25,
              carbs: 0,
              fats: 16,
              servingSize: '4 oz'
            },
            {
              id: 'f6',
              name: 'Brown Rice',
              calories: 200,
              protein: 4,
              carbs: 44,
              fats: 2,
              servingSize: '1 cup'
            },
            {
              id: 'f7',
              name: 'Steamed Broccoli',
              calories: 50,
              protein: 4,
              carbs: 10,
              fats: 0,
              servingSize: '1 cup'
            }
          ],
          totalCalories: 500,
          prepTime: 25
        }
      ],
      totalDailyCalories: 1400,
      macroTargets: {
        protein: 120,
        carbs: 180,
        fats: 60
      },
      waterIntake: 2.5
    };
  }

  static async getDailyDataWithFallback(date) {
    try {
      const key = `daily_data_${date}`;
      const data = await AsyncStorage.getItem(key);
      
      if (data) {
        return JSON.parse(data);
      } else {
        // Create default data
        const defaultData = {
          date,
          wod: this.getDefaultWOD(date),
          mealPlan: this.getDefaultMealPlan(date),
          completed: {
            wodCompleted: false,
            mealsLogged: false
          }
        };
        
        // Store for future use
        await AsyncStorage.setItem(key, JSON.stringify(defaultData));
        return defaultData;
      }
    } catch (error) {
      console.error('Error getting daily data:', error);
      return {
        date,
        wod: this.getDefaultWOD(date),
        mealPlan: this.getDefaultMealPlan(date),
        completed: {
          wodCompleted: false,
          mealsLogged: false
        }
      };
    }
  }
}

export default function HomeScreenWithWODMeals() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyData, setDailyData] = useState<DailyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    wod: false,
    meals: false
  });
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [loggedMeals, setLoggedMeals] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadDailyData();
  }, [selectedDate]);

  const loadDailyData = async () => {
    setIsLoading(true);
    try {
      const data = await OfflineDataManager.getDailyDataWithFallback(selectedDate);
      setDailyData(data);
    } catch (error) {
      Alert.alert('Error', 'Could not load daily data');
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    if (dateString === today.toISOString().split('T')[0]) {
      return 'Today';
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const navigateDate = (direction) => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(currentDate);
    
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 1);
    } else {
      newDate.setDate(currentDate.getDate() + 1);
    }
    
    setSelectedDate(newDate.toISOString().split('T')[0]);
  };

  const toggleExerciseComplete = (exerciseId) => {
    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  const toggleMealLogged = (mealId) => {
    setLoggedMeals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(mealId)) {
        newSet.delete(mealId);
      } else {
        newSet.add(mealId);
      }
      return newSet;
    });
  };

  const getMealIcon = (mealType) => {
    switch (mealType) {
      case 'breakfast': return '🌅';
      case 'lunch': return '🌞';
      case 'dinner': return '🌙';
      case 'snack': return '🍎';
      default: return '🍽️';
    }
  };

  if (isLoading || !dailyData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading your daily plan...</Text>
      </SafeAreaView>
    );
  }

  const completionPercentage = dailyData.wod.exercises.length > 0 
    ? (completedExercises.size / dailyData.wod.exercises.length) * 100 
    : 0;

  const loggedMealCount = loggedMeals.size;
  const totalMeals = dailyData.mealPlan.meals.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadDailyData} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>JamvisRN</Text>
          <View style={styles.offlineIndicator}>
            <Text style={styles.offlineText}>🔴 Offline Mode</Text>
          </View>
        </View>

        {/* Date Navigation */}
        <View style={styles.dateSelector}>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => navigateDate('prev')}
          >
            <Text style={styles.dateButtonText}>‹</Text>
          </TouchableOpacity>
          
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => navigateDate('next')}
          >
            <Text style={styles.dateButtonText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* WOD Section */}
        <TouchableOpacity 
          style={styles.sectionCard}
          onPress={() => toggleSection('wod')}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>💪 Today's WOD</Text>
            <Text style={styles.expandIcon}>
              {expandedSections.wod ? '−' : '+'}
            </Text>
          </View>
          <Text style={styles.sectionSubtitle}>{dailyData.wod.title}</Text>
          <Text style={styles.estimatedTime}>
            ~{dailyData.wod.estimatedDuration} minutes
          </Text>
          
          {completedExercises.size > 0 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[styles.progressFill, { width: `${completionPercentage}%` }]} 
                />
              </View>
              <Text style={styles.progressText}>
                {completedExercises.size}/{dailyData.wod.exercises.length} completed
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Expanded WOD Details */}
        {expandedSections.wod && (
          <View style={styles.wodDetails}>
            <Text style={styles.wodDescription}>{dailyData.wod.description}</Text>
            
            {/* Exercises */}
            {dailyData.wod.exercises.map((exercise, index) => {
              const isCompleted = completedExercises.has(exercise.id);
              
              return (
                <View key={exercise.id} style={styles.exerciseCard}>
                  <View style={styles.exerciseHeader}>
                    <Text style={styles.exerciseNumber}>{index + 1}</Text>
                    <View style={styles.exerciseInfo}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <Text style={styles.exerciseDetails}>
                        {exercise.sets} sets × {exercise.reps ? `${exercise.reps} reps` : `${exercise.duration}s`}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.checkButton, isCompleted && styles.checkedButton]}
                      onPress={() => toggleExerciseComplete(exercise.id)}
                    >
                      <Text style={[styles.checkText, isCompleted && styles.checkedText]}>
                        {isCompleted ? '✓' : '○'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.instructions}>{exercise.instructions}</Text>
                </View>
              );
            })}

            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => Alert.alert('Workout Started!', 'Great job staying active!')}
            >
              <Text style={styles.startButtonText}>
                {completedExercises.size > 0 ? 'Continue Workout' : 'Start Workout'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Meal Plan Section */}
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
          <Text style={styles.mealCount}>
            {totalMeals} meals • {Object.keys(dailyData.mealPlan.macroTargets).length} macro targets
          </Text>

          {loggedMealCount > 0 && (
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>
                {loggedMealCount}/{totalMeals} meals logged
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(loggedMealCount / totalMeals) * 100}%` }
                  ]} 
                />
              </View>
            </View>
          )}
        </TouchableOpacity>

        {/* Expanded Meal Details */}
        {expandedSections.meals && (
          <View style={styles.mealDetails}>
            {/* Daily Targets */}
            <View style={styles.dailyTargets}>
              <Text style={styles.targetsTitle}>Daily Targets</Text>
              <View style={styles.targetsRow}>
                <View style={styles.targetItem}>
                  <Text style={styles.targetValue}>{dailyData.mealPlan.macroTargets.protein}g</Text>
                  <Text style={styles.targetLabel}>Protein</Text>
                </View>
                <View style={styles.targetItem}>
                  <Text style={styles.targetValue}>{dailyData.mealPlan.macroTargets.carbs}g</Text>
                  <Text style={styles.targetLabel}>Carbs</Text>
                </View>
                <View style={styles.targetItem}>
                  <Text style={styles.targetValue}>{dailyData.mealPlan.macroTargets.fats}g</Text>
                  <Text style={styles.targetLabel}>Fats</Text>
                </View>
                <View style={styles.targetItem}>
                  <Text style={styles.targetValue}>{dailyData.mealPlan.waterIntake}L</Text>
                  <Text style={styles.targetLabel}>Water</Text>
                </View>
              </View>
            </View>

            {/* Individual Meals */}
            {dailyData.mealPlan.meals.map((meal) => {
              const isLogged = loggedMeals.has(meal.id);
              
              return (
                <View key={meal.id} style={styles.mealCard}>
                  <View style={styles.mealHeader}>
                    <View style={styles.mealInfo}>
                      <Text style={styles.mealTitle}>
                        {getMealIcon(meal.type)} {meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}
                      </Text>
                      <Text style={styles.mealTime}>{meal.time}</Text>
                      <Text style={styles.mealCalories}>{meal.totalCalories} calories</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.logButton, isLogged && styles.loggedButton]}
                      onPress={() => toggleMealLogged(meal.id)}
                    >
                      <Text style={[styles.logText, isLogged && styles.loggedText]}>
                        {isLogged ? '✓' : 'Log'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  
                  {/* Food items */}
                  <View style={styles.foodItems}>
                    {meal.items.map(item => (
                      <Text key={item.id} style={styles.foodItem}>
                        • {item.name} ({item.calories} cal)
                      </Text>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Alert.alert('Progress', `WOD: ${completionPercentage.toFixed(0)}% • Meals: ${loggedMealCount}/${totalMeals}`)}
          >
            <Text style={styles.actionButtonText}>View Progress</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  offlineIndicator: {
    backgroundColor: '#ff6b6b',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  offlineText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginHorizontal: 30,
    minWidth: 120,
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
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
  mealCount: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#ecf0f1',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#27ae60',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#27ae60',
    fontWeight: '600',
  },
  wodDetails: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wodDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  exerciseCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseNumber: {
    backgroundColor: '#3498db',
    color: '#fff',
    borderRadius: 12,
    width: 24,
    height: 24,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  checkButton: {
    borderWidth: 2,
    borderColor: '#bdc3c7',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedButton: {
    backgroundColor: '#27ae60',
    borderColor: '#27ae60',
  },
  checkText: {
    color: '#bdc3c7',
    fontWeight: 'bold',
  },
  checkedText: {
    color: '#fff',
  },
  instructions: {
    fontSize: 13,
    color: '#7f8c8d',
    fontStyle: 'italic',
    marginLeft: 36,
  },
  startButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealDetails: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dailyTargets: {
    marginBottom: 20,
  },
  targetsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  targetsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  targetItem: {
    alignItems: 'center',
  },
  targetValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  targetLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 2,
  },
  mealCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealInfo: {
    flex: 1,
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
  logButton: {
    backgroundColor: '#f39c12',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  loggedButton: {
    backgroundColor: '#27ae60',
  },
  logText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loggedText: {
    color: '#fff',
  },
  foodItems: {
    marginTop: 8,
  },
  foodItem: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  quickActions: {
    padding: 20,
  },
  actionButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
