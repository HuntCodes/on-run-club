import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSession } from '../context/SessionContext';
import { supabase } from '../config/supabase';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignupScreen } from '../screens/auth/SignupScreen';
import { HomeScreen } from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { session } = useSession();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!session ? (
          // Auth Stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          </>
        ) : (
          // App Stack
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => supabase.auth.signOut()}
                  style={styles.logoutButton}
                >
                  <Text>Logout</Text>
                </TouchableOpacity>
              ),
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 10,
  },
});
