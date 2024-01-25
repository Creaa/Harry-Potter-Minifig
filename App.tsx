import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/pages/HomePage';
import {
  ChangaOne_400Regular,
  ChangaOne_400Regular_Italic,
  useFonts,
} from '@expo-google-fonts/changa-one';
import { RepositoryProvider } from './src/context/repository.context';
import { QueryClient, QueryClientProvider } from 'react-query';
import axiosInstance from './src/common/utils/axios';
import { GlobalProvider } from './src/context';
import PersonalDetailsPage from './src/pages/PersonalDetailsPage';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

function App() {
  let [fontsLoaded] = useFonts({
    ChangaOne_400Regular,
    ChangaOne_400Regular_Italic,
  });

  if (!fontsLoaded) {
    return '';
  } else {
    return (
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <GlobalProvider>
            <RepositoryProvider axios={axiosInstance}>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="PersonalDetails" component={PersonalDetailsPage} />
              </Stack.Navigator>
            </RepositoryProvider>
          </GlobalProvider>
        </QueryClientProvider>
      </NavigationContainer>
    );
  }
}

export default App;
