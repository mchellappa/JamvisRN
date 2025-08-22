// Ultra-simple ES5 compatible App for maximum device compatibility
var React = require('react');
var ReactNative = require('react-native');

var SafeAreaView = ReactNative.SafeAreaView;
var ScrollView = ReactNative.ScrollView;
var StatusBar = ReactNative.StatusBar;
var StyleSheet = ReactNative.StyleSheet;
var Text = ReactNative.Text;
var View = ReactNative.View;
var Platform = ReactNative.Platform;

// Simple storage fallback
var storage = {
  getItem: function(key) {
    try {
      var AsyncStorage = require('@react-native-async-storage/async-storage');
      return AsyncStorage.getItem(key);
    } catch (e) {
      return Promise.resolve(null);
    }
  },
  setItem: function(key, value) {
    try {
      var AsyncStorage = require('@react-native-async-storage/async-storage');
      return AsyncStorage.setItem(key, value);
    } catch (e) {
      return Promise.resolve();
    }
  }
};

function UltraSimpleApp() {
  var useState = React.useState;
  var useEffect = React.useEffect;
  
  var currentDate = useState('')[0];
  var setCurrentDate = useState('')[1];
  var todayWOD = useState('Loading...')[0];
  var setTodayWOD = useState('Loading...')[1];
  var todayMeal = useState('Loading...')[0];
  var setTodayMeal = useState('Loading...')[1];
  var isLegacy = useState(false)[0];
  var setIsLegacy = useState(false)[1];

  useEffect(function() {
    // Set current date
    var now = new Date();
    setCurrentDate(now.toLocaleDateString());
    
    // Check if legacy device
    if (Platform.OS === 'android' && Platform.Version < 21) {
      setIsLegacy(true);
    }
    
    loadTodayData();
  }, []);

  function loadTodayData() {
    var dateKey = new Date().toDateString();
    
    // Load WOD
    storage.getItem('wod_' + dateKey).then(function(wod) {
      if (!wod) {
        var wods = [
          "5 rounds: 20 squats, 15 push-ups, 10 burpees",
          "EMOM 20: 5 pull-ups, 10 push-ups, 15 squats",
          "3 rounds: 30s plank, 20 lunges, 15 sit-ups"
        ];
        wod = wods[Math.floor(Math.random() * wods.length)];
        storage.setItem('wod_' + dateKey, wod);
      }
      setTodayWOD(wod || "Default WOD: 20 squats, 15 push-ups, 10 burpees");
    }).catch(function() {
      setTodayWOD("Default WOD: 20 squats, 15 push-ups, 10 burpees");
    });

    // Load meal
    storage.getItem('meal_' + dateKey).then(function(meal) {
      if (!meal) {
        var meals = [
          "Breakfast: Oatmeal with berries\nLunch: Grilled chicken salad\nDinner: Salmon with vegetables",
          "Breakfast: Greek yogurt with nuts\nLunch: Turkey wrap\nDinner: Lean beef with quinoa"
        ];
        meal = meals[Math.floor(Math.random() * meals.length)];
        storage.setItem('meal_' + dateKey, meal);
      }
      setTodayMeal(meal || "Default: Balanced meals with protein, carbs, and vegetables");
    }).catch(function() {
      setTodayMeal("Default: Balanced meals with protein, carbs, and vegetables");
    });
  }

  return React.createElement(SafeAreaView, { style: styles.container },
    React.createElement(StatusBar, { barStyle: "dark-content", backgroundColor: "#f8f9fa" }),
    React.createElement(ScrollView, { style: styles.scrollView },
      
      // Header
      React.createElement(View, { style: styles.header },
        React.createElement(Text, { style: styles.appTitle }, "Jamvis"),
        React.createElement(Text, { style: styles.dateText }, currentDate),
        isLegacy ? React.createElement(Text, { style: styles.legacyText }, "Legacy Mode") : null
      ),

      // WOD Section  
      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "💪 Today's WOD"),
        React.createElement(View, { style: styles.card },
          React.createElement(Text, { style: styles.wodText }, todayWOD)
        )
      ),

      // Meal Section
      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "🍎 Today's Meal Plan"),
        React.createElement(View, { style: styles.card },
          React.createElement(Text, { style: styles.mealText }, todayMeal)
        )
      ),

      // Footer
      React.createElement(View, { style: styles.footer },
        React.createElement(Text, { style: styles.offlineText }, "📱 Available Offline")
      )
    )
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  scrollView: {
    flex: 1
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef'
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 5
  },
  dateText: {
    fontSize: 16,
    color: '#6c757d'
  },
  legacyText: {
    fontSize: 12,
    color: '#dc3545',
    marginTop: 5
  },
  section: {
    margin: 15
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 10
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  wodText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#343a40'
  },
  mealText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#343a40'
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20
  },
  offlineText: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '500'
  }
});

module.exports = UltraSimpleApp;
