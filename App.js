import {
  useFonts,
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic,
} from "@expo-google-fonts/open-sans";
import { StatusBar } from "expo-status-bar";
import { useState, useContext } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "./components/OnBoarding";
import LoginScreen from "./screens/AuthScreens/LoginScreen";
import RegisterScreen from "./screens/AuthScreens/RegisterScreen";
import MainScreen from "./screens/MainScreens/MainScreen";
import AuthContextProvider, { AuthContext } from "./store/context/auth-context";
import COLORS from "./constants/colors";
import ProgramContextProvider from "./store/context/program-context";
import UserdataContextProvider from "./store/context/userdata-context";

function Root() {
  const [showApp, setShowApp] = useState(false);
  const userAuthCtx = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_300Light_Italic,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold,
    OpenSans_800ExtraBold_Italic,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  function onDoneHandler() {
    setShowApp(true);
  }

  const Stack = createNativeStackNavigator();

  if (!showApp) {
    return <OnBoarding onDone={onDoneHandler} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {userAuthCtx.isLoggedIn ? (
          <Stack.Screen name="Main" component={MainScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <ProgramContextProvider>
          <UserdataContextProvider>
            <Root />
          </UserdataContextProvider>
        </ProgramContextProvider>
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
