import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const PROGRESS_DATA = {
  weight: { current: 75.2, target: 70, unit: 'kg', trend: -2.1 },
  bodyFat: { current: 18.5, target: 15, unit: '%', trend: -1.2 },
  muscle: { current: 45.8, target: 48, unit: 'kg', trend: +0.8 },
};

const WEEKLY_STATS = [
  { day: 'Mon', workouts: 1, calories: 2100 },
  { day: 'Tue', workouts: 0, calories: 1950 },
  { day: 'Wed', workouts: 1, calories: 2200 },
  { day: 'Thu', workouts: 1, calories: 2050 },
  { day: 'Fri', workouts: 0, calories: 1800 },
  { day: 'Sat', workouts: 2, calories: 2400 },
  { day: 'Sun', workouts: 1, calories: 2150 },
];

const ACHIEVEMENTS = [
  { id: '1', title: 'First Week', description: 'Completed 7 days', icon: '🏆', unlocked: true },
  { id: '2', title: 'Consistency', description: '5 workouts this week', icon: '🔥', unlocked: true },
  { id: '3', title: 'Nutrition Goal', description: 'Met daily targets', icon: '🎯', unlocked: false },
  { id: '4', title: 'Strong Lifter', description: 'Bench press milestone', icon: '💪', unlocked: false },
];

export default function ProgressScreen({ navigation }) {
  const [selectedPeriod, setSelectedPeriod] = useState('Week');

  const renderProgressCard = (title, data) => {
    const progressPercent = Math.min((data.current / data.target) * 100, 100);
    const isPositiveTrend = data.trend > 0;
    
    return (
      <View style={styles.progressCard} key={title}>
        <Text style={styles.progressTitle}>{title}</Text>
        <View style={styles.progressValues}>
          <Text style={styles.currentValue}>{data.current}{data.unit}</Text>
          <Text style={styles.targetValue}>Goal: {data.target}{data.unit}</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
        </View>
        <View style={styles.trendContainer}>
          <Text style={[styles.trendText, { color: isPositiveTrend ? '#2ecc71' : '#e74c3c' }]}>
            {isPositiveTrend ? '↗' : '↘'} {Math.abs(data.trend)}{data.unit} this week
          </Text>
        </View>
      </View>
    );
  };

  const renderWeeklyBar = (day, index) => {
    const maxWorkouts = Math.max(...WEEKLY_STATS.map(d => d.workouts));
    const workoutHeight = (day.workouts / Math.max(maxWorkouts, 1)) * 60;
    
    return (
      <View style={styles.weeklyBarContainer} key={day.day}>
        <View style={styles.workoutBar}>
          <View style={[styles.workoutFill, { height: workoutHeight }]} />
        </View>
        <Text style={styles.dayLabel}>{day.day}</Text>
        <Text style={styles.workoutCount}>{day.workouts}</Text>
      </View>
    );
  };

  const renderAchievement = (achievement) => (
    <View 
      style={[styles.achievementCard, !achievement.unlocked && styles.lockedAchievement]} 
      key={achievement.id}
    >
      <Text style={styles.achievementIcon}>{achievement.icon}</Text>
      <View style={styles.achievementInfo}>
        <Text style={[styles.achievementTitle, !achievement.unlocked && styles.lockedText]}>
          {achievement.title}
        </Text>
        <Text style={[styles.achievementDescription, !achievement.unlocked && styles.lockedText]}>
          {achievement.description}
        </Text>
      </View>
      {achievement.unlocked && <Text style={styles.unlockedBadge}>✓</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>📈 Progress</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {['Week', 'Month', 'Year'].map(period => (
            <TouchableOpacity
              key={period}
              style={[styles.periodButton, selectedPeriod === period && styles.selectedPeriod]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[styles.periodText, selectedPeriod === period && styles.selectedPeriodText]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Body Composition Progress */}
        <Text style={styles.sectionTitle}>Body Composition</Text>
        <View style={styles.progressGrid}>
          {renderProgressCard('Weight', PROGRESS_DATA.weight)}
          {renderProgressCard('Body Fat', PROGRESS_DATA.bodyFat)}
          {renderProgressCard('Muscle Mass', PROGRESS_DATA.muscle)}
        </View>

        {/* Weekly Activity */}
        <Text style={styles.sectionTitle}>Weekly Activity</Text>
        <View style={styles.weeklyChart}>
          <Text style={styles.chartTitle}>Workouts This Week</Text>
          <View style={styles.barsContainer}>
            {WEEKLY_STATS.map((day, index) => renderWeeklyBar(day, index))}
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Workouts</Text>
            <Text style={styles.statSubLabel}>This Month</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>18.5</Text>
            <Text style={styles.statLabel}>Avg Hours</Text>
            <Text style={styles.statSubLabel}>Per Week</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2.1</Text>
            <Text style={styles.statLabel}>Kg Lost</Text>
            <Text style={styles.statSubLabel}>This Month</Text>
          </View>
        </View>

        {/* Achievements */}
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsList}>
          {ACHIEVEMENTS.map(renderAchievement)}
        </View>
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 30,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  selectedPeriod: {
    backgroundColor: '#3498db',
  },
  periodText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  selectedPeriodText: {
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    marginTop: 10,
  },
  progressGrid: {
    gap: 15,
    marginBottom: 30,
  },
  progressCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  progressValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 15,
  },
  currentValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
  },
  targetValue: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  trendContainer: {
    alignItems: 'flex-end',
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  weeklyChart: {
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
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
  },
  weeklyBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  workoutBar: {
    width: 20,
    height: 60,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  workoutFill: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    width: '100%',
  },
  dayLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  workoutCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3498db',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
  },
  statSubLabel: {
    fontSize: 10,
    color: '#95a5a6',
    marginTop: 2,
  },
  achievementsList: {
    gap: 10,
    marginBottom: 30,
  },
  achievementCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  lockedText: {
    color: '#bdc3c7',
  },
  unlockedBadge: {
    fontSize: 18,
    color: '#2ecc71',
  },
});
