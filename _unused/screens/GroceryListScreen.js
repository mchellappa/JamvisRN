import React, { useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

export default function GroceryListScreen() {
  const [mealName, setMealName] = useState('');
  const [groceryList, setGroceryList] = useState([]);

  const fetchGroceryList = async () => {
    const res = await axios.get('http://localhost:8000/meals/grocery-list', {
      params: mealName ? { meal_name: mealName } : {},
    });
    setGroceryList(res.data.ingredients || []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery List</Text>
      <TextInput placeholder="Meal Name (optional)" value={mealName} onChangeText={setMealName} style={styles.input} />
      <Button title="Fetch Grocery List" onPress={fetchGroceryList} />
      <FlatList
        data={groceryList}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - {item.quantity}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 4 },
});
