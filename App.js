import { Button, ScrollView } from "react-native";
import { AuthProvider, useAuth } from "./app/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import Harry from "./app/screens/Harry";
import Fight from "./app/screens/Fight";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={Home}
            screenOptions={{ headerShown: false }}
          ></Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Harry"
              component={Harry}
              screenOptions={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Login"
              component={Login}
              screenOptions={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={Register}
              screenOptions={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Fight"
              component={Fight}
              screenOptions={{ headerShown: false }}
            ></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
