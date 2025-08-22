import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JarvisLogo from '../components/JarvisLogo';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLogin = async () => {
    try {
      // Default credentials for testing
      const validCredentials = [
        { username: 'admin', password: 'admin123' },
        { username: 'user', password: 'password' },
        { username: 'jamvis', password: 'jamvis2025' }
      ];

      // Check if credentials match any valid combination
      const isValid = validCredentials.some(
        cred => cred.username === username && cred.password === password
      );

      if (isValid) {
        await AsyncStorage.setItem('user', username); // Save login state
        navigation.replace('Workouts');
      } else {
        // Try API call as fallback (if backend is available)
        try {
          const res = await axios.post('http://localhost:8000/login', null, {
            params: { username, password },
          });
          await AsyncStorage.setItem('user', username);
          navigation.replace('Workouts');
        } catch (apiErr) {
          setError('Invalid username or password. Try: admin/admin123 or user/password');
        }
      }
    } catch (err) {
      setError('Login failed. Try: admin/admin123 or user/password');
    }
  };

  return (
    <View style={styles.container}>
      <JarvisLogo size={120} style={styles.logo} />
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Jamvis Login</Text>
        <TouchableOpacity 
          style={styles.helpButton}
          onPress={() => setShowTooltip(!showTooltip)}
          activeOpacity={0.7}
        >
          <Text style={styles.helpIcon}>?</Text>
        </TouchableOpacity>
      </View>
      
      {showTooltip && (
        <View style={styles.tooltip}>
          <Text style={styles.tooltipTitle}>Default Test Credentials:</Text>
          <Text style={styles.tooltipText}>• admin / admin123</Text>
          <Text style={styles.tooltipText}>• user / password</Text>
          <Text style={styles.tooltipText}>• jamvis / jamvis2025</Text>
        </View>
      )}
      
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#001a1a' },
  logo: { marginBottom: 30, alignSelf: 'center' },
  titleContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#00ffff' },
  helpButton: { 
    marginLeft: 10, 
    width: 24, 
    height: 24, 
    borderRadius: 12, 
    backgroundColor: '#00ffff', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  helpIcon: { color: '#001a1a', fontSize: 14, fontWeight: 'bold' },
  tooltip: { 
    backgroundColor: '#333', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 20,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#00cccc',
  },
  tooltipTitle: { color: '#00ffff', fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  tooltipText: { color: '#fff', fontSize: 12, marginBottom: 2 },
  input: { borderWidth: 1, marginBottom: 10, padding: 12, borderRadius: 8, backgroundColor: 'rgba(0, 255, 255, 0.1)', borderColor: '#00cccc', color: '#fff' },
  error: { color: '#ff4444', marginBottom: 10, textAlign: 'center' },
});
