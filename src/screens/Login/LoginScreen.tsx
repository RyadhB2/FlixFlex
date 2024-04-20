import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import styles from './styles';
import InputField from '../../components/InputField';
import { Button } from 'react-native-paper';
import { authenticate } from '../../slices/user.slice';
import { useAppDispatch } from '../../redux/store/ConfigureStore';
import { isEmailValid, isPasswordValid } from '../../utils/validators';

const LoginScreen: React.FC = () => {
  //State
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);


  //Hooks
  const dispatch = useAppDispatch()

  //Effects


  //functions

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      if (isEmailValid(email) && isPasswordValid(password)) {
        await dispatch(authenticate(email, password))
      } else {
        Alert.alert("Invalid credentials", "Please verify your email/password")
        setIsLoading(false)
      }
    } catch (e) {
      Alert.alert("Error while authenticating", "Account doesn't exisit / unvalid credentials...")
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
        <InputField label='Phone number or Email' value={email} onChangeText={setEmail}
          roundness={8} placeholderColor={"gray"} outlineColor={"gray"}
          containerStyle={{ marginBottom: 8 }}
        />
        <InputField label='Password' value={password} onChangeText={setPassword}
          roundness={8} placeholderColor={"gray"} outlineColor={"gray"}
          containerStyle={{ marginBottom: 8 }}
        />
        <Button
          contentStyle={[styles.button, { opacity: isLoading ? 0.5 : 1 }]}
          onPress={handleLogin}
          theme={{ roundness: 2 }}
          labelStyle={styles.labelButtonStyle}
          disabled={isLoading}
          loading={isLoading}>
          Sign In
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
