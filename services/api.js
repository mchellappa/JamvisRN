import axios from 'axios';

const API_BASE = 'http://localhost:8000';

export const login = (username, password) =>
  axios.post(`${API_BASE}/login`, null, { params: { username, password } });

export const getWorkout = (username) =>
  axios.get(`${API_BASE}/workouts/today?username=${username}`);

export const uploadWorkout = (data) =>
  axios.post(`${API_BASE}/workouts/today`, data);

export const addMealIngredients = (meal_name, ingredients) =>
  axios.post(`${API_BASE}/meals/ingredients`, { meal_name, ingredients });

export const getGroceryList = (meal_name) =>
  axios.get(`${API_BASE}/meals/grocery-list`, { params: meal_name ? { meal_name } : {} });
