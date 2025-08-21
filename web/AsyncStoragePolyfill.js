// AsyncStorage polyfill for web
class AsyncStoragePolyfill {
  static async getItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('AsyncStorage getItem error:', error);
      return null;
    }
  }

  static async setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('AsyncStorage setItem error:', error);
    }
  }

  static async removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('AsyncStorage removeItem error:', error);
    }
  }

  static async multiGet(keys) {
    try {
      return keys.map(key => [key, localStorage.getItem(key)]);
    } catch (error) {
      console.error('AsyncStorage multiGet error:', error);
      return [];
    }
  }

  static async multiSet(keyValuePairs) {
    try {
      keyValuePairs.forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
    } catch (error) {
      console.error('AsyncStorage multiSet error:', error);
    }
  }

  static async clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('AsyncStorage clear error:', error);
    }
  }
}

export default AsyncStoragePolyfill;
