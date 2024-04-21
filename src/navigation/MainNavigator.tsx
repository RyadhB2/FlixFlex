import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabStack';
import { MainNavigatorParamList } from '../utils/RoutersType';
import DetailScreen from '../screens/Details';
import TopRated from '../screens/TopRated';

const Stack = createNativeStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTab" screenOptions={{
      headerShown: true
    }}>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigator}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailScreen}
      />
      <Stack.Screen
        name="TopRated"
        component={TopRated}
        options={({ route }) => {
          return ({
            title: `Top Rated ${route.params.forMedia}s`
          })
        }}
      />
    </Stack.Navigator>
  );
};
// title:  `Top Rated ${route.params.forMedia}s`
export default MainNavigator;
