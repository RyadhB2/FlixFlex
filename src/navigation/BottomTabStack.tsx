import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//screens
import MoviesScreen from "../screens/Movies";
import SeriesScreen from "../screens/Series/SeriesScreen";

const BottomTabStack = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return (
        <BottomTabStack.Navigator initialRouteName="Home"
            screenOptions={{
                headerShown: true
            }}>

            <BottomTabStack.Screen name="Movies" component={MoviesScreen} />
            <BottomTabStack.Screen name="Series" component={SeriesScreen} />

        </BottomTabStack.Navigator>
    )
}

export default BottomTabNavigator