import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/ui/buttons/Button";
import ButtonNoOutline from "../../components/ui/buttons/ButtonNoOutline";
import Card from "../../components/ui/cards/Card";
import InputField from "../../components/ui/InputField";
import COLORS from "../../constants/colors";

function RegisterScreen({ navigation }) {
  const [inputs, setInputs] = useState({
    name: {
      value: "",
      isValid: true,
    },
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
  });

  const [inputIsFocused, setInputIsFocused] = useState({
    name: {
      isFocused: false,
    },
    email: {
      isFocused: false,
    },
    password: {
      isFocused: false,
    },
  });

  const [showPassword, setShowPassword] = useState(true);

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
      email: inputs.email.value,
      password: inputs.password.value,
    };

    // Also need to check for existing email through backend
    const nameIsValid = submitData.name.length > 0;
    const emailIsValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      submitData.email
    );
    const passIsValid = submitData.password.length > 10;

    if (!emailIsValid || !passIsValid) {
      setInputs((currentInputs) => {
        return {
          name: {
            value: currentInputs.name.value,
            isValid: nameIsValid,
          },
          email: {
            value: currentInputs.email.value,
            isValid: emailIsValid,
          },
          password: {
            value: currentInputs.password.value,
            isValid: passIsValid,
          },
        };
      });
      return;
    }

    // Daftar User Here
    console.log("User Terdaftar");

    // Add Loading

    // Navigate to Login
    navigation.navigate("Login");
  }

  return (
    <>
      <Image
        source={require("../../assets/images/element_2.png")}
        style={styles.cornerImage}
      ></Image>
      <View style={styles.screen}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.logoIcon}
        ></Image>
        <Card style={{ marginHorizontal: 20 }}>
          <Text style={styles.pageTitle} adjustsFontSizeToFit numberOfLines={1}>
            Daftar
          </Text>
          <View
            style={[
              styles.inputContainer,
              inputIsFocused.name.isFocused && styles.focusedContainer,
              !inputs.name.isValid && styles.invalidContainer,
            ]}
          >
            <Ionicons
              name={"person"}
              size={16}
              style={{
                marginRight: 10,
                color: !inputs.name.isValid
                  ? "red"
                  : inputIsFocused.name.isFocused
                  ? COLORS.primary
                  : "#C8C8C8",
              }}
            />
            <InputField
              placeholder="Nama"
              onChangeText={onChangeHandler.bind(this, "name")}
              value={inputs.name.value}
              onFocus={onFocusHandler.bind(this, "name")}
              onBlur={onBlurHandler.bind(this, "name")}
              focusState={inputIsFocused.name.isFocused}
            ></InputField>
          </View>
          <View
            style={[
              styles.inputContainer,
              inputIsFocused.email.isFocused && styles.focusedContainer,
              !inputs.email.isValid && styles.invalidContainer,
            ]}
          >
            <Ionicons
              name={"mail"}
              size={16}
              style={{
                marginRight: 10,
                color: !inputs.email.isValid
                  ? "red"
                  : inputIsFocused.email.isFocused
                  ? COLORS.primary
                  : "#C8C8C8",
              }}
            />
            <InputField
              placeholder="Email"
              onChangeText={onChangeHandler.bind(this, "email")}
              value={inputs.email.value}
              onFocus={onFocusHandler.bind(this, "email")}
              onBlur={onBlurHandler.bind(this, "email")}
              focusState={inputIsFocused.email.isFocused}
            ></InputField>
          </View>
          <View
            style={[
              styles.inputContainer,
              inputIsFocused.password.isFocused && styles.focusedContainer,
              !inputs.password.isValid && styles.invalidContainer,
            ]}
          >
            <Ionicons
              name={"lock-closed"}
              size={16}
              style={{
                marginRight: 10,
                color: !inputs.password.isValid
                  ? "red"
                  : inputIsFocused.password.isFocused
                  ? COLORS.primary
                  : "#C8C8C8",
              }}
            />
            <InputField
              placeholder="Password"
              onChangeText={onChangeHandler.bind(this, "password")}
              value={inputs.password.value}
              onFocus={onFocusHandler.bind(this, "password")}
              onBlur={onBlurHandler.bind(this, "password")}
              focusState={inputIsFocused.password.isFocused}
              secureTextEntry={showPassword}
            ></InputField>
            <Pressable
              onPress={() =>
                setShowPassword((currShowPass) => {
                  return !currShowPass;
                })
              }
              style={{ marginLeft: "auto" }}
            >
              <Ionicons name={"eye"} style={{ color: "#C8C8C8" }} size={16} />
            </Pressable>
          </View>
          <Button
            style={{ marginVertical: 40 }}
            text="Daftar"
            onPress={submitHandler}
          ></Button>
          <View>
            <Text style={{ textAlign: "center", color: "#999999" }}>
              atau masuk dengan
            </Text>
            <Pressable>
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Image
                  source={require("../../assets/images/google_icon.png")}
                  style={styles.googleImgStyle}
                ></Image>
              </View>
            </Pressable>
          </View>
        </Card>
        <View style={styles.bottomNav}>
          <Text style={{ marginRight: 6 }}>Sudah punya akun Specifit?</Text>
          <ButtonNoOutline
            text="MASUK"
            onPress={() => navigation.navigate("Login")}
          ></ButtonNoOutline>
        </View>
      </View>
    </>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#C8C8C8",
    borderBottomWidth: 1,
    marginVertical: 14,
  },
  pageTitle: {
    fontFamily: "OpenSans_700Bold",
    textAlign: "center",
    fontSize: 16,
  },
  logoIcon: {
    resizeMode: "contain",
    height: 120,
    width: 120,
    marginLeft: 5,
  },
  cornerImage: {
    resizeMode: "contain",
    alignSelf: "flex-end",
    marginTop: -5,
    position: "absolute",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  googleImgStyle: {
    resizeMode: "contain",
    height: 40,
    width: 40,
  },
  invalidContainer: {
    borderBottomColor: "red",
  },
  focusedContainer: {
    borderBottomColor: COLORS.primary,
  },
});
