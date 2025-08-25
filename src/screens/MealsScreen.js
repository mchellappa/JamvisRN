import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';

const SAMPLE_MEALS = [
  { id: '1', name: 'Breakfast', time: '8:00 AM', calories: 420, items: 'Oatmeal, Banana, Almonds' },
  { id: '2', name: 'Lunch', time: '12:30 PM', calories: 650, items: 'Grilled Chicken, Rice, Vegetables' },
  { id: '3', name: 'Snack', time: '3:00 PM', calories: 180, items: 'Greek Yogurt, Berries' },
  { id: '4', name: 'Dinner', time: '7:00 PM', calories: 580, items: 'Salmon, Sweet Potato, Broccoli' },
];

const NUTRITION_GOALS = {
  calories: { current: 1830, target: 2200 },
  protein: { current: 145, target: 165 },
  carbs: { current: 210, target: 275 },
  fat: { current: 68, target: 80 },
};

export default function MealsScreen({ navigation }) {
  const [selectedMeal, setSelectedMeal] = useState(null);

  const renderMeal = ({ item }) => (
    <TouchableOpacity 
      style={[styles.mealCard, selectedMeal?.id === item.id && styles.selectedCard]}
      onPress={() => setSelectedMeal(item)}
    >
      <View style={styles.mealHeader}>
        <View>
          <Text style={styles.mealName}>{item.name}</Text>
          <Text style={styles.mealTime}>{item.time}</Text>
        </View>
        <View style={styles.caloriesContainer}>
          <Text style={styles.calories}>{item.calories}</Text>
          <Text style={styles.caloriesLabel}>cal</Text>
        </View>
      </View>
      <Text style={styles.mealItems}>{item.items}</Text>
    </TouchableOpacity>
  );

  const renderNutritionBar = (label, data) => {
    const percentage = (data.current / data.target) * 100;
    return (
      <View style={styles.nutritionItem} key={label}>
        <View style={styles.nutritionHeader}>
          <Text style={styles.nutritionLabel}>{label}</Text>
          <Text style={styles.nutritionValues}>{data.current}/{data.target}g</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min(percentage, 100)}%` }]} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🍽️ Meals</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Daily Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today's Nutrition</Text>
          <View style={styles.caloriesSummary}>
            <Text style={styles.caloriesNumber}>{NUTRITION_GOALS.calories.current}</Text>
            <Text style={styles.caloriesTarget}>/ {NUTRITION_GOALS.calories.target} calories</Text>
          </View>
          
          <View style={styles.nutritionGrid}>
            {renderNutritionBar('Protein', NUTRITION_GOALS.protein)}
            {renderNutritionBar('Carbs', NUTRITION_GOALS.carbs)}
            {renderNutritionBar('Fat', NUTRITION_GOALS.fat)}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Today's Meals</Text>
        
        <FlatList
          data={SAMPLE_MEALS}
          renderItem={renderMeal}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />

        {selectedMeal && (
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit {selectedMeal.name} ✏️</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Log New Meal</Text>
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
  summaryCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  caloriesSummary: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  caloriesNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e67e22',
  },
  caloriesTarget: {
    fontSize: 16,
    color: '#7f8c8d',
    marginLeft: 8,
  },
  nutritionGrid: {
    gap: 15,
  },
  nutritionItem: {
    marginBottom: 10,
  },
  nutritionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nutritionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  nutritionValues: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  mealCard: {
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
    borderColor: '#e67e22',
    borderWidth: 2,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  mealTime: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  caloriesContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  calories: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e67e22',
  },
  caloriesLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginLeft: 2,
  },
  mealItems: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  editButton: {
    backgroundColor: '#f39c12',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  editButtonText: {
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
