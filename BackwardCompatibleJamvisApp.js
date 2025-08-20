import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

class BackwardCompatibleJamvisApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutData: null,
      mealData: null,
      currentDate: new Date(),
      loading: true,
    };
    
    this.loadData = this.loadData.bind(this);
    this.saveData = this.saveData.bind(this);
    this.getDateString = this.getDateString.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  getDateString(date) {
    var months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    var dayName = days[date.getDay()];
    var monthName = months[date.getMonth()];
    var dayNum = date.getDate();
    var year = date.getFullYear();
    
    return dayName + ', ' + monthName + ' ' + dayNum + ', ' + year;
  }

  loadData() {
    var self = this;
    var dateKey = this.getDateString(this.state.currentDate);
    
    AsyncStorage.getItem('jamvis_workout_' + dateKey)
      .then(function(workoutData) {
        AsyncStorage.getItem('jamvis_meal_' + dateKey)
          .then(function(mealData) {
            self.setState({
              workoutData: workoutData ? JSON.parse(workoutData) : self.getDefaultWorkout(),
              mealData: mealData ? JSON.parse(mealData) : self.getDefaultMeals(),
              loading: false,
            });
          })
          .catch(function(error) {
            console.log('Error loading meal data:', error);
            self.setState({
              workoutData: self.getDefaultWorkout(),
              mealData: self.getDefaultMeals(),
              loading: false,
            });
          });
      })
      .catch(function(error) {
        console.log('Error loading workout data:', error);
        self.setState({
          workoutData: self.getDefaultWorkout(),
          mealData: self.getDefaultMeals(),
          loading: false,
        });
      });
  }

  saveData() {
    var dateKey = this.getDateString(this.state.currentDate);
    
    AsyncStorage.setItem('jamvis_workout_' + dateKey, JSON.stringify(this.state.workoutData));
    AsyncStorage.setItem('jamvis_meal_' + dateKey, JSON.stringify(this.state.mealData));
  }

  getDefaultWorkout() {
    return {
      name: "Upper Body Strength",
      exercises: [
        { name: "Push-ups", sets: 3, reps: 15, completed: false },
        { name: "Squats", sets: 3, reps: 20, completed: false },
        { name: "Plank", sets: 3, duration: "45 seconds", completed: false },
        { name: "Lunges", sets: 2, reps: 12, completed: false },
      ],
      duration: "30 minutes",
      difficulty: "Intermediate"
    };
  }

  getDefaultMeals() {
    return {
      breakfast: {
        name: "Protein Oatmeal Bowl",
        calories: 350,
        protein: "25g",
        carbs: "45g",
        fat: "8g"
      },
      lunch: {
        name: "Grilled Chicken Salad",
        calories: 420,
        protein: "35g",
        carbs: "15g",
        fat: "12g"
      },
      dinner: {
        name: "Salmon with Sweet Potato",
        calories: 480,
        protein: "32g",
        carbs: "35g",
        fat: "18g"
      },
      snack: {
        name: "Greek Yogurt with Berries",
        calories: 180,
        protein: "15g",
        carbs: "20g",
        fat: "4g"
      }
    };
  }

  toggleExerciseComplete(exerciseIndex) {
    var newWorkoutData = Object.assign({}, this.state.workoutData);
    newWorkoutData.exercises[exerciseIndex].completed = !newWorkoutData.exercises[exerciseIndex].completed;
    this.setState({ workoutData: newWorkoutData }, this.saveData);
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Jamvis</Text>
          </View>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      );
    }

    var self = this;
    
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Jamvis</Text>
          <Text style={styles.dateText}>{this.getDateString(this.state.currentDate)}</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Workout</Text>
            <View style={styles.workoutCard}>
              <Text style={styles.workoutName}>{this.state.workoutData.name}</Text>
              <Text style={styles.workoutInfo}>
                Duration: {this.state.workoutData.duration} | Level: {this.state.workoutData.difficulty}
              </Text>
              
              <View style={styles.exercisesList}>
                {this.state.workoutData.exercises.map(function(exercise, index) {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[styles.exerciseItem, exercise.completed && styles.exerciseCompleted]}
                      onPress={function() { self.toggleExerciseComplete(index); }}
                    >
                      <Text style={[styles.exerciseName, exercise.completed && styles.completedText]}>
                        {exercise.name}
                      </Text>
                      <Text style={[styles.exerciseDetails, exercise.completed && styles.completedText]}>
                        {exercise.sets} sets × {exercise.reps || exercise.duration}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Meal Plan</Text>
            
            {Object.keys(this.state.mealData).map(function(mealType) {
              var meal = self.state.mealData[mealType];
              return (
                <View key={mealType} style={styles.mealCard}>
                  <Text style={styles.mealType}>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</Text>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <View style={styles.nutritionInfo}>
                    <Text style={styles.nutritionItem}>Calories: {meal.calories}</Text>
                    <Text style={styles.nutritionItem}>Protein: {meal.protein}</Text>
                    <Text style={styles.nutritionItem}>Carbs: {meal.carbs}</Text>
                    <Text style={styles.nutritionItem}>Fat: {meal.fat}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#2c3e50',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#bdc3c7',
    textAlign: 'center',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#34495e',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  workoutCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  workoutInfo: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
  },
  exercisesList: {
    marginTop: 10,
  },
  exerciseItem: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  exerciseCompleted: {
    backgroundColor: '#d5f4e6',
    borderLeftColor: '#27ae60',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#95a5a6',
  },
  mealCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mealType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e67e22',
    marginBottom: 5,
  },
  mealName: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 10,
  },
  nutritionInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    fontSize: 12,
    color: '#7f8c8d',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 5,
  },
});

export default BackwardCompatibleJamvisApp;
