import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HistoryScreen from '../screens/HistoryScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Namai',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

const ExerciseStack = createStackNavigator({
  Exercise: ExerciseScreen,
});

ExerciseStack.navigationOptions = {
  tabBarLabel: 'Treniruotė',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-fitness' : 'md-fitness'}
    />
  ),
};

const HistoryStack = createStackNavigator({
  History: HistoryScreen,
});

HistoryStack.navigationOptions = {
  tabBarLabel: 'Atliktos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Įrankiai',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-stopwatch' : 'md-stopwatch'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ExerciseStack,
  HistoryStack,
  SettingsStack,
});
