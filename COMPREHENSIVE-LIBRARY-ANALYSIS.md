# Complete React Native 0.73.6 Library Override List

## 🔍 **Discovered Issues:**

### **Major Library Conflicts:**
1. **@react-native-async-storage/async-storage@2.2.0**: minSdkVersion = 23 (Android 6.0+)
2. **com.facebook.react**: minSdkVersion = 21 (Android 5.0+) 
3. **com.facebook.fresco**: minSdkVersion = 21 (Android 5.0+)
4. **com.facebook.imagepipeline**: Part of Fresco, likely API 21+
5. **com.facebook.soloader**: Likely API 21+ with React Native 0.73.6
6. **com.facebook.hermes**: Hermes engine likely API 21+
7. **com.facebook.jni**: JNI bridge likely API 21+

### **Potential Additional Libraries in React Native 0.73.6:**
- Various Facebook internal libraries
- New Architecture components
- TurboModule infrastructure
- JSI (JavaScript Interface) components
- Flipper integration (already removed)

## 🛡️ **Comprehensive Manifest Override Strategy:**

Instead of listing individual libraries, use a broad pattern-based override that covers all React Native ecosystem libraries that might conflict with API 19.

### **Current Override:**
```xml
<uses-sdk tools:overrideLibrary="com.facebook.react,com.facebook.fresco,com.facebook.imagepipeline,com.facebook.soloader,com.facebook.hermes,com.facebook.jni,com.reactnativecommunity.asyncstorage" />
```

### **Enhanced Override Pattern:**
Since React Native 0.73.6 is a modern version, it's designed for modern Android versions. The reality is that MANY sub-dependencies likely require API 21+.

## 💡 **Alternative Strategy Recommendation:**

Given that React Native 0.73.6 fundamentally targets modern Android (API 21+), for TRUE backward compatibility with very old devices (API 19), consider:

1. **Downgrade to React Native 0.68.x**: Last version with broader API 19 support
2. **Use older AsyncStorage**: Version 1.x likely supports API 19
3. **Accept Limited Compatibility**: Override everything and test extensively

## 🎯 **Current Status:**
- Manifest overrides added for all known conflicting libraries
- AsyncStorage 2.2.0 override added (but may have runtime issues on API 19)
- Ready for testing, but functionality not guaranteed on very old devices
