import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/authSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short!').required('Required'),
});

import type { StackNavigationProp } from '@react-navigation/stack';

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data
      const mockUser = {
        id: '1',
        name: values.email.split('@')[0],
        email: values.email,
      };

      // Mock token
      const mockToken = 'mock-jwt-token';

      dispatch(login({ user: mockUser, token: mockToken }));
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Logo Header */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/img/logo.png')} // Replace with your actual logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Your success is our focus</Text>
      </View>

      {/* Welcome Text */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Welcome Login System</Text>
        <Text style={styles.welcomeSubtitle}>
          Your gateway to seamless transactions and easy payments.
        </Text>
      </View>

      {/* Login Form */}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            {/* Email Input */}
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              mode="outlined"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={touched.email && !!errors.email}
              placeholder="dineshsm@example.com"
              style={styles.input}
              outlineStyle={styles.inputOutline}
              theme={{
                colors: {
                  primary: theme.colors.onBackground,
                  placeholder: theme.colors.onBackground,
                },
              }}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Password Input */}
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              mode="outlined"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={touched.password && !!errors.password}
              secureTextEntry
              placeholder="Min 8 characters"
              style={styles.input}
              outlineStyle={styles.inputOutline}
              theme={{
                colors: {
                  primary: theme.colors.onBackground,
                  placeholder: theme.colors.onBackground,
                },
              }}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <View style={styles.rowContainer}>
              <View style={styles.rememberContainer}>
                <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                  <View
                    style={[
                      styles.rememberCheckbox,
                      { backgroundColor: theme.colors.onPrimary },
                    ]}
                  >
                    {rememberMe && (
                      <View
                        style={[
                          styles.rememberChecked,
                          { backgroundColor: theme.colors.primary },
                        ]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={styles.rememberText}>Remember me</Text>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={[styles.signUpLink, {color: theme.colors.onBackground}]}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              loading={isLoading}
              disabled={isLoading}
              style={styles.signInButton}
              labelStyle={styles.buttonLabel}
            >
              Sign in
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 320,
    height: 100,
  },
  tagline: {
    marginTop: 8,
    fontSize: 14,
  },
  welcomeContainer: {
    marginBottom: 32,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
    // backgroundColor: 'white',
  },
  inputOutline: {
    borderRadius: 8,
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 6,
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberChecked: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  rememberText: {
    fontSize: 14,
  },
  signInButton: {
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: 14,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
