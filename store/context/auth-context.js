import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  isLoggedIn: null,
  loginHandler: () => {},
  logoutHandler: () => {},
});

function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let storedUserInfo;
      try {
        storedUserInfo = await AsyncStorage.getItem("isLoggedIn");
        if (storedUserInfo === "1") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        console.log("Error, Session not Found");
      }
    };
    bootstrapAsync();
  }, []);

  function loginHandler() {
    const loginAsync = async () => {
      try {
        await AsyncStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
      } catch (e) {
        console.log("Error Setting Item");
        console.log(e);
      }
    };
    loginAsync();
  }

  function logoutHandler() {
    const logoutAsync = async () => {
      try {
        await AsyncStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
      } catch (e) {
        console.log("Error Removing Item");
      }
    };
    logoutAsync();
  }

  const value = {
    isLoggedIn: isLoggedIn,
    loginHandler: loginHandler,
    logoutHandler: logoutHandler,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
