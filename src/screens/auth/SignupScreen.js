import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../config/supabase';

const colors = {
  background: '#fff',
  border: '#ddd',
  primary: '#000',
  text: '#000',
  textLight: '#fff',
};

export const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      Alert.alert('Success', 'Check your email for the confirmation link!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Sign Up'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  linkText: {
    color: colors.text,
    marginTop: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
});
