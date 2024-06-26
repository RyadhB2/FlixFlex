import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Text,
  View,
  Pressable
} from 'react-native';
import styles from './styles';
import InputField from '../../components/InputField';
import { Button } from 'react-native-paper';
import { authenticate } from '../../slices/user.slice';
import { useAppDispatch } from '../../redux/store/ConfigureStore';
import { isEmailValid, isPasswordValid } from '../../utils/validators';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../../utils/RoutersType';

const LoginScreen: React.FC = () => {
  //State
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  //Hooks
  const dispatch = useAppDispatch()
  const navigation = useNavigation<AuthNavigationProp>()

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
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.subText}>Please log in to start using the app</Text>

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
        <Button
          contentStyle={[styles.button, { opacity: isLoading ? 0.5 : 1 }]}
          onPress={handleLogin}
          theme={{ roundness: 2 }}
          labelStyle={styles.labelButtonStyle}
          disabled={isLoading}
          loading={isLoading}>
          Sign In
        </Button>


        <View style={{ marginTop: 12, flexDirection: "row" }}>
          <Text style={styles.subText}>You don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={[styles.subText, { fontWeight: "bold" }]}>Register</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
