import { View, Text, StyleSheet, Image } from "react-native";
import { useState } from "react";
import Button from "../../../components/ui/buttons/Button";
import ButtonNoOutline from "../../../components/ui/buttons/ButtonNoOutline";
import InputField from "../../../components/ui/InputField";
import COLORS from "../../../constants/colors";

function EditProfileScreen() {
  // Have to set input field to user data (in db) on load
  const initialUserdata = {
    name: {
      value: "",
      isValid: true,
    },
    phoneNum: {
      value: "",
      isValid: true,
    },
    email: {
      value: "",
      isValid: true,
    },
  };

  const [inputs, setInputs] = useState(initialUserdata);

  const [inputIsFocused, setInputIsFocused] = useState({
    name: {
      isFocused: false,
    },
    phoneNum: {
      isFocused: false,
    },
    email: {
      isFocused: false,
    },
  });

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
      phoneNum: inputs.phoneNum.value,
      email: inputs.email.value,
    };

    // Also need to check for email and pass through backend
    const nameIsValid = submitData.name.length > 0;
    const phoneNumIsValid = /^(\+62|62|0)8[1-9][0-9]{6,9}$/.test(
      submitData.phoneNum
    );
    const emailIsValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      submitData.email
    );

    if (!nameIsValid || !emailIsValid || !phoneNumIsValid) {
      setInputs((currentInputs) => {
        return {
          name: {
            value: currentInputs.name.value,
            isValid: nameIsValid,
          },
          phoneNum: {
            value: currentInputs.phoneNum.value,
            isValid: phoneNumIsValid,
          },
          email: {
            value: currentInputs.email.value,
            isValid: emailIsValid,
          },
        };
      });
      return;
    }

    // Update Here
    console.log("User Profile Updated");

    // Add Loading
    console.log("Loading");
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
          style={[
            styles.inputContainer,
            inputIsFocused.phoneNum.isFocused && styles.focusedContainer,
            !inputs.phoneNum.isValid && styles.invalidContainer,
          ]}
        >
          <Text>Nomor HP</Text>
          <InputField
            placeholder="Nomor HP"
            onChangeText={onChangeHandler.bind(this, "phoneNum")}
            value={inputs.phoneNum.value}
            onFocus={onFocusHandler.bind(this, "phoneNum")}
            onBlur={onBlurHandler.bind(this, "phoneNum")}
            focusState={inputIsFocused.phoneNum.isFocused}
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            inputIsFocused.email.isFocused && styles.focusedContainer,
            !inputs.email.isValid && styles.invalidContainer,
          ]}
        >
          <Text>Alamat E-mail</Text>
          <InputField
            placeholder="E-mail"
            onChangeText={onChangeHandler.bind(this, "email")}
            value={inputs.email.value}
            onFocus={onFocusHandler.bind(this, "email")}
            onBlur={onBlurHandler.bind(this, "email")}
            focusState={inputIsFocused.email.isFocused}
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
