# Ultimate Android API 19 Compatibility Override

## 🚨 **Current Issue:**
Manifest merger keeps finding specific sub-components of Fresco that require API 21+:
- Latest: `com.facebook.drawee.backends.pipeline`

## 🛡️ **Nuclear Option - Wildcard Override:**

If specific library overrides keep failing, Android manifest merger supports wildcard patterns. However, this is extremely aggressive and may cause runtime issues.

### **Alternative Manifest Override (Use if current approach fails):**
```xml
<!-- NUCLEAR OPTION: Override ALL libraries (very risky) -->
<uses-sdk tools:overrideLibrary="*" />
```

This tells Android to ignore ALL library minSdk requirements, not just specific ones.

## ⚠️ **Risks:**
- May cause runtime crashes on API 19 devices
- No selective control over which libraries to override
- May mask legitimate compatibility issues

## 🎯 **Current Strategy:**
We're using targeted overrides for specific known libraries. Each error message tells us exactly which library to add next.

## 📋 **Libraries Added So Far:**
1. `com.facebook.react` - Core React Native
2. `com.facebook.fresco` - Image loading library  
3. `com.facebook.drawee.backends.pipeline` - Fresco drawing backend
4. Multiple Fresco sub-components
5. React Native bridge components
6. AsyncStorage community library
7. AndroidX support libraries

## 🔄 **Next Steps:**
If more specific library errors appear, we'll continue adding them to the override list until all are covered.
