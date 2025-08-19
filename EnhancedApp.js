import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  TextInput,
  Modal,
  FlatList,
  SafeAreaView
} from 'react-native';

export default function EnhancedApp() {
  const [currentView, setCurrentView] = useState('home');
  const [workouts, setWorkouts] = useState([
    { id: 1, name: 'Push-ups', reps: 20, completed: false },
    { id: 2, name: 'Squats', reps: 30, completed: false },
    { id: 3, name: 'Plank', reps: 60, completed: false }
  ]);
  const [meals, setMeals] = useState([
    { id: 1, name: 'Breakfast', calories: 400, completed: false },
    { id: 2, name: 'Lunch', calories: 600, completed: false },
    { id: 3, name: 'Dinner', calories: 500, completed: false }
  ]);
  const [groceryList, setGroceryList] = useState([
    { id: 1, item: 'Chicken Breast', bought: false },
    { id: 2, item: 'Broccoli', bought: false },
    { id: 3, item: 'Brown Rice', bought: false }
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState('');

  const toggleWorkout = (id) => {
    setWorkouts(workouts.map(workout => 
      workout.id === id ? { ...workout, completed: !workout.completed } : workout
    ));
  };

  const toggleMeal = (id) => {
    setMeals(meals.map(meal => 
      meal.id === id ? { ...meal, completed: !meal.completed } : meal
    ));
  };

  const toggleGrocery = (id) => {
    setGroceryList(groceryList.map(grocery => 
      grocery.id === id ? { ...grocery, bought: !grocery.bought } : grocery
    ));
  };

  const addGroceryItem = () => {
    if (newItem.trim()) {
      setGroceryList([...groceryList, {
        id: Date.now(),
        item: newItem.trim(),
        bought: false
      }]);
      setNewItem('');
      setModalVisible(false);
    }
  };

  const renderHome = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Jamvis</Text>
        <Text style={styles.subtitle}>Health & Fitness Companion</Text>
      </View>
      
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={[styles.menuItem, styles.workoutItem]} 
          onPress={() => setCurrentView('workouts')}
        >
          <Text style={styles.menuIcon}>💪</Text>
          <Text style={styles.menuText}>Workouts</Text>
          <Text style={styles.menuDesc}>Track your exercises</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, styles.mealItem]} 
          onPress={() => setCurrentView('meals')}
        >
          <Text style={styles.menuIcon}>🍽️</Text>
          <Text style={styles.menuText}>Meals</Text>
          <Text style={styles.menuDesc}>Plan your nutrition</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, styles.groceryItem]} 
          onPress={() => setCurrentView('grocery')}
        >
          <Text style={styles.menuIcon}>🛒</Text>
          <Text style={styles.menuText}>Grocery List</Text>
          <Text style={styles.menuDesc}>Shopping reminders</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.menuItem, styles.profileItem]} 
          onPress={() => setCurrentView('profile')}
        >
          <Text style={styles.menuIcon}>👤</Text>
          <Text style={styles.menuText}>Profile</Text>
          <Text style={styles.menuDesc}>Your progress</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderWorkouts = () => (
    <View style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentView('home')} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Workouts</Text>
      </View>
      <FlatList
        data={workouts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.listItem, item.completed && styles.completedItem]}
            onPress={() => toggleWorkout(item.id)}
          >
            <Text style={[styles.listItemText, item.completed && styles.completedText]}>
              {item.name} - {item.reps} {item.name === 'Plank' ? 'seconds' : 'reps'}
            </Text>
            <Text style={styles.statusText}>
              {item.completed ? '✅' : '⭕'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderMeals = () => (
    <View style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentView('home')} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Meals</Text>
      </View>
      <FlatList
        data={meals}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.listItem, item.completed && styles.completedItem]}
            onPress={() => toggleMeal(item.id)}
          >
            <Text style={[styles.listItemText, item.completed && styles.completedText]}>
              {item.name} - {item.calories} calories
            </Text>
            <Text style={styles.statusText}>
              {item.completed ? '✅' : '⭕'}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.totalCalories}>
        Total: {meals.reduce((sum, meal) => sum + (meal.completed ? meal.calories : 0), 0)} calories
      </Text>
    </View>
  );

  const renderGrocery = () => (
    <View style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentView('home')} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Grocery List</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={groceryList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.listItem, item.bought && styles.completedItem]}
            onPress={() => toggleGrocery(item.id)}
          >
            <Text style={[styles.listItemText, item.bought && styles.completedText]}>
              {item.item}
            </Text>
            <Text style={styles.statusText}>
              {item.bought ? '✅' : '⭕'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderProfile = () => (
    <View style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => setCurrentView('home')} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Profile</Text>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.profileText}>📊 Today's Progress</Text>
        <Text style={styles.statsText}>
          Workouts: {workouts.filter(w => w.completed).length}/{workouts.length}
        </Text>
        <Text style={styles.statsText}>
          Meals: {meals.filter(m => m.completed).length}/{meals.length}
        </Text>
        <Text style={styles.statsText}>
          Groceries: {groceryList.filter(g => g.bought).length}/{groceryList.length}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {currentView === 'home' && renderHome()}
      {currentView === 'workouts' && renderWorkouts()}
      {currentView === 'meals' && renderMeals()}
      {currentView === 'grocery' && renderGrocery()}
      {currentView === 'profile' && renderProfile()}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Grocery Item</Text>
            <TextInput
              style={styles.textInput}
              value={newItem}
              onChangeText={setNewItem}
              placeholder="Enter item name"
              autoFocus={true}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.addModalButton]} 
                onPress={addGroceryItem}
              >
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  menuContainer: {
    gap: 16,
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutItem: {
    borderLeftColor: '#e74c3c',
    borderLeftWidth: 4,
  },
  mealItem: {
    borderLeftColor: '#f39c12',
    borderLeftWidth: 4,
  },
  groceryItem: {
    borderLeftColor: '#27ae60',
    borderLeftWidth: 4,
  },
  profileItem: {
    borderLeftColor: '#3498db',
    borderLeftWidth: 4,
  },
  menuIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  menuText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  menuDesc: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: '600',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  addButton: {
    backgroundColor: '#27ae60',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    backgroundColor: '#fff',
  },
  completedItem: {
    backgroundColor: '#f8f9fa',
  },
  listItemText: {
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#95a5a6',
  },
  statusText: {
    fontSize: 20,
    marginLeft: 12,
  },
  totalCalories: {
    padding: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#27ae60',
  },
  profileContainer: {
    padding: 20,
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsText: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 12,
    paddingLeft: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    backgroundColor: '#95a5a6',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minWidth: 80,
  },
  addModalButton: {
    backgroundColor: '#27ae60',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});
