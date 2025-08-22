import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

// JARVIS Logo Component
export default function JarvisLogo({ size = 120, style = {} }) {
  return (
    <View style={[styles.logoContainer, { width: size, height: size }, style]}>
      {/* JARVIS logo */}
      <View style={[styles.placeholderLogo, { width: size, height: size }]}>
        {/* Circular border effect similar to the logo */}
        <View style={[styles.outerRing, { width: size, height: size }]} />
        <View style={[styles.innerRing, { width: size * 0.85, height: size * 0.85 }]} />
        <View style={styles.centerText}>
          <Image 
            source={require('../assets/jarvis-logo.png')} 
            style={[styles.logo, { width: size * 0.7, height: size * 0.7 }]}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderLogo: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  outerRing: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#00ffff',
    backgroundColor: 'transparent',
  },
  innerRing: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#00cccc',
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
  },
  centerText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // When using actual image:
  logo: {
    tintColor: undefined, // Remove to keep original colors
  },
});

/* 
Instructions to implement the actual JARVIS logo:

1. Save the futuristic JARVIS logo from the image as: 'assets/jarvis-logo.png'
2. Install react-native image handling if needed:
   npm install react-native-svg (if it's an SVG)
3. Replace the placeholder View with Image component
4. Update imports to include Image from react-native

Example usage in screens:
import JarvisLogo from '../components/JarvisLogo';

<JarvisLogo size={100} style={{ marginBottom: 20 }} />
*/
