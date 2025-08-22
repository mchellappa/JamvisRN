import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function MealsScreen({ navigation }) {
  const [mealName, setMealName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQty, setIngredientQty] = useState('');

  const addIngredient = () => {
    if (ingredientName && ingredientQty) {
      setIngredients([...ingredients, { name: ingredientName, quantity: ingredientQty }]);
      setIngredientName('');
      setIngredientQty('');
    }
  };

  const handleSubmit = async () => {
    await axios.post('http://localhost:8000/meals/ingredients', {
      meal_name: mealName,
      ingredients,
    });
    setMealName('');
    setIngredients([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Meal Ingredients</Text>
      <TextInput placeholder="Meal Name" value={mealName} onChangeText={setMealName} style={styles.input} />
      <TextInput placeholder="Ingredient Name" value={ingredientName} onChangeText={setIngredientName} style={styles.input} />
      <TextInput placeholder="Quantity" value={ingredientQty} onChangeText={setIngredientQty} style={styles.input} />
      <Button title="Add Ingredient" onPress={addIngredient} />
      <FlatList
        data={ingredients}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - {item.quantity}</Text>
        )}
      />
      <Button title="Submit Meal" onPress={handleSubmit} />
      <Button title="Go to Grocery List" onPress={() => navigation.navigate('GroceryList')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
});
