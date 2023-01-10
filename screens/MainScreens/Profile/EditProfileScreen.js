import { View, Text, StyleSheet, Alert } from "react-native";
import { useState, useEffect } from "react";
import Button from "../../../components/ui/buttons/Button";
import InputField from "../../../components/ui/InputField";
import COLORS from "../../../constants/colors";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase/firebase";
import { getAuth } from "firebase/auth";

function EditProfileScreen() {
  const [isClicked, setIsClicked] = useState(false);
  const [profile, setProfile] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    try {
      const getName = async () => {
        try {
          const data = await getDoc(doc(db, "users", user.uid));
          const usersData = data.data();
          setProfile(usersData);
        } catch (e) {
          Alert.alert(e.message);
        }
      };
      getName();
    } catch (e) {
      Alert.alert(e.message);
    }
  }, []);

  async function updateUserdata() {
    if (profile) {
      try {
        updateDoc(doc(db, "users", user.uid), profile);
      } catch (e) {
        Alert.alert(e.message);
      }
    }
  }

  const initialUserdata = {
    name: {
      value: profile?.name,
      isValid: true,
    },
  };

  const [inputs, setInputs] = useState(initialUserdata);

  const [inputIsFocused, setInputIsFocused] = useState({
    name: {
      isFocused: false,
    },
  });

  useEffect(() => {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        ["name"]: {
          ...currentInputs.name,
          ["value"]: profile?.name,
        },
      };
    });
  }, [profile]);

  useEffect(() => {
    updateUserdata();
  }, [isClicked]);

  function onChangeHandler(inputCtg, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputCtg]: { value: enteredValue, isValid: true },
      };
    });
  }

  function onFocusHandler(inputCtg) {
    setInputIsFocused((currentInputs) => {
      return {
        ...currentInputs,
        [inputCtg]: { isFocused: true },
      };
    });
  }

  function onBlurHandler(inputCtg) {
    setInputIsFocused((currentInputs) => {
      return {
        ...currentInputs,
        [inputCtg]: { isFocused: false },
      };
    });
  }

  function submitHandler() {
    const submitData = {
      name: inputs.name.value,
    };

    const nameIsValid = submitData.name.length > 0;

    if (!nameIsValid) {
      setInputs((currentInputs) => {
        return {
          name: {
            value: currentInputs.name.value,
            isValid: nameIsValid,
          },
        };
      });
      return;
    }

    setProfile((prevState) => {
      return {
        ...prevState,
        ["name"]: submitData.name,
      };
    });

    setIsClicked((prevState) => {
      const newState = !prevState;
      return newState;
    });
    Alert.alert("Nama Sukses Diubah");
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerStyle}>
        <View
          style={[
            styles.inputContainer,
            inputIsFocused.name.isFocused && styles.focusedContainer,
            !inputs.name.isValid && styles.invalidContainer,
          ]}
        >
          <Text>Nama</Text>
          <InputField
            placeholder="Nama"
            onChangeText={onChangeHandler.bind(this, "name")}
            value={inputs.name.value}
            onFocus={onFocusHandler.bind(this, "name")}
            onBlur={onBlurHandler.bind(this, "name")}
            focusState={inputIsFocused.name.isFocused}
          />
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Button
            style={styles.buttonStyle}
            text="Simpan"
            onPress={submitHandler}
          />
        </View>
      </View>
    </View>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 90,
    marginHorizontal: 20,
  },
  imgStyle: {
    borderRadius: 40,
    width: 80,
    height: 80,
    marginRight: 20,
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  buttonStyle: {
    marginTop: 20,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  inputContainer: {
    borderBottomColor: "#C8C8C8",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  invalidContainer: {
    borderBottomColor: "red",
  },
  focusedContainer: {
    borderBottomColor: COLORS.primary,
  },
});
