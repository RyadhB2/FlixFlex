import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabStack';
import { MainNavigatorParamList } from '../utils/RoutersType';
import DetailScreen from '../screens/Details';

const Stack = createNativeStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTab" screenOptions={{
      headerShown: true
    }}>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigator}
      />
      <Stack.Screen
        name="Details"
        component={DetailScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
