import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Alert,
  Text,
  View,
  Pressable
} from 'react-native';
import styles from './styles';
import InputField from '../../components/InputField';
import { Button } from 'react-native-paper';
import { registerAndSignIn } from '../../slices/user.slice';
import { useAppDispatch } from '../../redux/store/ConfigureStore';
import { isEmailValid, isPasswordValid } from '../../utils/validators';

const RegisterScreen: React.FC = () => {
  //State
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  //Hooks
  const dispatch = useAppDispatch()

  //Effects


  //functions

  const handleRegister = async () => {
    try {
      setIsLoading(true)
      if (isEmailValid(email) && isPasswordValid(password) && password === confirmedPassword) {
        await dispatch(registerAndSignIn(email, password))
      } else {
        Alert.alert("Invalid credentials", "Please verify your email/password, make sure the passwords you entred match match")
        setIsLoading(false)
      }
    } catch (e) {
      Alert.alert("Error while authenticating", `${e}\nPlease try again ...`)
      console.error("Error while authenticating ....", e)
      setIsLoading(false)
    }
  }
  //rendering
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>

        <Text style={styles.subText}>Please enter a valid Email and password</Text>

        <InputField label='Email' value={email} onChangeText={setEmail}
          roundness={8} placeholderColor={"gray"} outlineColor={"gray"}
          containerStyle={{ marginBottom: 8 }}
        />
        <InputField label='Password' value={password} onChangeText={setPassword}
          roundness={8} placeholderColor={"gray"} outlineColor={"gray"}
          containerStyle={{ marginBottom: 8 }}
          secureTextEntry={showPassword}
          rightIcon={!showPassword ? 'eye-outline' : 'eye-off'}
          onRightIconPress={() => setShowPassword(!showPassword)}
        />
        <InputField label='Confirm Password' value={confirmedPassword} onChangeText={setConfirmedPassword}
          roundness={8} placeholderColor={"gray"} outlineColor={"gray"}
          containerStyle={{ marginBottom: 8 }}
          secureTextEntry={showPassword}
          rightIcon={!showPassword ? 'eye-outline' : 'eye-off'}
          onRightIconPress={() => setShowPassword(!showPassword)}
        />
        <Button
          contentStyle={[styles.button, { opacity: isLoading ? 0.5 : 1 }]}
          onPress={handleRegister}
          theme={{ roundness: 2 }}
          labelStyle={styles.labelButtonStyle}
          disabled={isLoading}
          loading={isLoading}>
          Register & Sign In
        </Button>


      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
