import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/Login";
import RegisterScreen from '../screens/Register';
import { AuthNavigatorParamList } from '../utils/RoutersType';

const Stack = createNativeStackNavigator<AuthNavigatorParamList>();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{
            headerShown: true
        }}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
