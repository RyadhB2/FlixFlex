import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//screens
import MoviesScreen from "../screens/Movies";
import SeriesScreen from "../screens/Series/SeriesScreen";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from "../theme/Colors";

const BottomTabStack = createBottomTabNavigator()

const BottomTabNavigator = () => {
    return (
        <BottomTabStack.Navigator initialRouteName="Home"
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary
            })}>
            <BottomTabStack.Screen name="Movies" component={MoviesScreen}
                options={{
                    tabBarIcon: (props) => <Icon name="movie-outline" size={20}
                        color={props.focused ? colors.primary : "gray"} />
                }} />
            <BottomTabStack.Screen name="Series" component={SeriesScreen}
                options={{
                    tabBarIcon: (props) => <Icon name="television-classic" size={20}
                        color={props.focused ? colors.primary : "gray"} />,
                }} />

        </BottomTabStack.Navigator>
    )
}

export default BottomTabNavigator