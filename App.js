import React from 'react';
import { SessionProvider } from './src/context/SessionContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SessionProvider>
      <AppNavigator />
    </SessionProvider>
  );
}
