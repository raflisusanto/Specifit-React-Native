import { createContext, useState } from "react";

export const UserdataContext = createContext({
  addUserdata: (key, value) => {},
  userdata: {},
});

function UserdataContextProvider({ children }) {
  const initialUserdata = {
    gender: '',
    age: '',
    height: '',
    weight: '',
    activity: '',
    medicalCondition: '',
    isFilled: false,
  };

  const [userdata, setUserdata] = useState(initialUserdata);

  function addUserdata(key, value) {
    setUserdata((currUserdata) => {
      return { ...currUserdata, [key]: value };
    });
  }

  const value = {
    addUserdata: addUserdata,
    userdata: userdata,
  };

  return (
    <UserdataContext.Provider value={value}>
      {children}
    </UserdataContext.Provider>
  );
}

export default UserdataContextProvider;
