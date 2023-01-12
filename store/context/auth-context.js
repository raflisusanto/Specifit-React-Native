import { createContext, useEffect, useState } from "react";
import { auth, db } from "../../config/firebase/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";

export const AuthContext = createContext({
  isLoggedIn: null,
  currentUid: null,
  loginHandler: (email, password) => {},
  signUpHandler: (email, password) => {},
  logoutHandler: () => {},
});

function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUid(user.uid);
      } else {
        setIsLoggedIn(false);
        setUid(null);
      }
    });

    return unsubscribe;
  }, []);

  function loginHandler(email, password) {
    // Firebase Auth
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setIsLoggedIn(true);
        const user = userCredentials.user;
      })
      .catch((e) => Alert.alert(e.message));
  }

  async function initializeDb(userId, name, email) {
    try {
      // Initialize Database
      await setDoc(doc(db, "users", userId), {
        email: email,
        name: name,
        timeStamp: serverTimestamp(),
      })

      await setDoc(doc(db, "userdata", userId), {
        gender: "",
        age: "",
        height: "",
        weight: "",
        activity: "",
        medicalCondition: "",
        isFilled: false,
        recommendation: {
          loseweight: false,
          gainweight: false,
          agility: false,
          fatburn: false,
          strength: false,
          calist: false,
          gemuk: false,
          normal: false,
          kurus: false,
          injury: false,
          item: false,
          recommend: false,
          sevendays: false,
          fourteendays: false,
          morefourteen: false,
        },
        imt: 0,
        imtStatus: "",
        calPerDayHold: 0,
        calPerDayLose: 0,
      });

      await setDoc(doc(db, "programstatus", userId), {
        programid: [],
        statusDay: {},
        bookmark: [],
      });
    } catch (e) {
      Alert.alert(e.message);
    }
  }

  async function signUpHandler(name, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        initializeDb(userCredentials.user.uid, name, email);
        const user = userCredentials.user;
      })
      .catch((e) => Alert.alert(e.message));
  }

  function logoutHandler() {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((e) => Alert.alert(e.message));
  }

  const value = {
    isLoggedIn: isLoggedIn,
    currentUid: uid,
    loginHandler: loginHandler,
    signUpHandler: signUpHandler,
    logoutHandler: logoutHandler,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
