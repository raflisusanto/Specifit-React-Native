import { View, StyleSheet, Text } from "react-native";
import Button from "../../../../components/ui/buttons/Button";
import QUESTION from "../../../../constants/question";
import COLORS from "../../../../constants/colors";
import InputField from "../../../../components/ui/InputField";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { UserdataContext } from "../../../../store/context/userdata-context";

function FormAge() {
  const navigation = useNavigation();
  const userdataCtx = useContext(UserdataContext);
  const [isError, setIsError] = useState(false);

  const [inputs, setInputs] = useState({
    age: {
      value: userdataCtx.userdata.age.toString(),
      isValid: true,
    },
  });

  const [inputIsFocused, setInputIsFocused] = useState({
    age: {
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
      age: +inputs.age.value,
    };

    const ageIsValid = submitData.age > 0 && submitData.age < 100;

    if (!ageIsValid) {
      setInputs((currentInputs) => {
        return {
          age: {
            value: currentInputs.age.value,
            isValid: ageIsValid,
          },
        };
      });
      setIsError(true);
      return;
    }

    // Update and Navigate Here
    nextPageHandler(submitData);
  }

  function nextPageHandler(submitData) {
    userdataCtx.addUserdata("age", submitData.age);
    console.log(submitData.age);
    navigation.navigate("FormHeight");
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
    >
      <View style={styles.containerStyle}>
        <Text style={styles.titleStyle}>{QUESTION[1]}</Text>
        <View style={styles.inputBackground}>
          <View
            style={[
              styles.inputContainer,
              inputIsFocused.age.isFocused && styles.focusedContainer,
              !inputs.age.isValid && styles.invalidContainer,
            ]}
          >
            <InputField
              onChangeText={onChangeHandler.bind(this, "age")}
              value={inputs.age.value}
              onFocus={onFocusHandler.bind(this, "age")}
              onBlur={onBlurHandler.bind(this, "age")}
              focusState={inputIsFocused.age.isFocused}
            />
          </View>
          <Text style={styles.descStyle}>tahun</Text>
        </View>
        {isError && (
          <Text style={styles.errorTextStyle}>Input tidak valid</Text>
        )}
        <Button
          text=""
          showIcon={true}
          iconName="arrow-forward"
          onPress={submitHandler}
          style={styles.btnStyle}
        />
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${34 + "%"}` }]}></View>
        </View>
        <Text style={styles.descStyle}>Halaman 2 dari 6</Text>
      </View>
    </View>
  );
}

export default FormAge;

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  btnStyle: {
    borderRadius: 10,
    padding: 10,
    marginTop: 100,
    alignItems: "center",
    flexDirection: "row",
    width: "18%",
    height: 50,
  },
  descStyle: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
  },
  progressContainer: {
    marginTop: 200,
    height: 10,
    borderRadius: 10,
    backgroundColor: COLORS.neutral_400,
    overflow: "hidden",
    width: 150,
  },
  progressBar: {
    height: 10,
    backgroundColor: COLORS.primary,
  },
  inputContainer: {
    borderBottomColor: "#C8C8C8",
    borderBottomWidth: 1,
    marginBottom: 20,
    marginTop: 20,
    marginRight: 10,
    alignItems: "center",
    width: 30,
    height: 20,
    paddingTop: 0,
  },
  invalidContainer: {
    borderBottomColor: "red",
  },
  focusedContainer: {
    borderBottomColor: COLORS.primary,
  },
  inputBackground: {
    backgroundColor: COLORS.neutral_400,
    flexDirection: "row",
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  errorTextStyle: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
    color: COLORS.primary,
    position: "absolute",
    top: 120,
    left: 120,
  },
});
