import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [currentDate, setCurrentDate] = React.useState('');
  const [todayWOD, setTodayWOD] = React.useState('');
  const [todayMeal, setTodayMeal] = React.useState('');

  React.useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString());
    loadTodayData();
  }, []);

  const loadTodayData = async () => {
    try {
      const dateKey = new Date().toDateString();
      
      // Load or create today's WOD
      let wod = await AsyncStorage.getItem(`wod_${dateKey}`);
      if (!wod) {
        const wods = [
          "5 rounds: 20 squats, 15 push-ups, 10 burpees",
          "EMOM 20: 5 pull-ups, 10 push-ups, 15 squats", 
          "Tabata: 8 rounds alternating mountain climbers and jumping jacks",
          "3 rounds: 30s plank, 20 lunges, 15 sit-ups",
          "AMRAP 15: 10 burpees, 15 kettlebell swings, 20 box steps"
        ];
        wod = wods[Math.floor(Math.random() * wods.length)];
        await AsyncStorage.setItem(`wod_${dateKey}`, wod);
      }
      setTodayWOD(wod);

      // Load or create today's meal plan
      let meal = await AsyncStorage.getItem(`meal_${dateKey}`);
      if (!meal) {
        const meals = [
          "Breakfast: Oatmeal with berries\nLunch: Grilled chicken salad\nDinner: Salmon with vegetables",
          "Breakfast: Greek yogurt with nuts\nLunch: Turkey wrap\nDinner: Lean beef with quinoa",
          "Breakfast: Smoothie bowl\nLunch: Tuna salad\nDinner: Chicken stir-fry",
          "Breakfast: Eggs with avocado\nLunch: Quinoa bowl\nDinner: Fish tacos",
          "Breakfast: Protein pancakes\nLunch: Mediterranean bowl\nDinner: Grilled tofu with rice"
        ];
        meal = meals[Math.floor(Math.random() * meals.length)];
        await AsyncStorage.setItem(`meal_${dateKey}`, meal);
      }
      setTodayMeal(meal);
    } catch (error) {
      console.warn('Storage error:', error);
      setTodayWOD("Default WOD: 20 squats, 15 push-ups, 10 burpees");
      setTodayMeal("Default: Balanced meals with protein, carbs, and vegetables");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Jamvis</Text>
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>

        {/* Today's WOD Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💪 Today's WOD</Text>
          <View style={styles.card}>
            <Text style={styles.wodText}>{todayWOD}</Text>
          </View>
        </View>

        {/* Today's Meal Plan Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🍎 Today's Meal Plan</Text>
          <View style={styles.card}>
            <Text style={styles.mealText}>{todayMeal}</Text>
          </View>
        </View>

        {/* Offline Status */}
        <View style={styles.footer}>
          <Text style={styles.offlineText}>📱 Available Offline</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#6c757d',
  },
  section: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wodText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#343a40',
  },
  mealText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#343a40',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  offlineText: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '500',
  },
});

export default App;
