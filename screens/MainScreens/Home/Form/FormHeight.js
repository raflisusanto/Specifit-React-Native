import { View, StyleSheet, Text } from "react-native";
import Button from "../../../../components/ui/buttons/Button";
import QUESTION from "../../../../constants/question";
import COLORS from "../../../../constants/colors";
import InputField from "../../../../components/ui/InputField";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { UserdataContext } from "../../../../store/context/userdata-context";

function FormHeight() {
  const navigation = useNavigation();
  const userdataCtx = useContext(UserdataContext);
  const [isError, setIsError] = useState(false);

  const [inputs, setInputs] = useState({
    height: {
      value: userdataCtx.userdata.height.toString(),
      isValid: true,
    },
  });

  const [inputIsFocused, setInputIsFocused] = useState({
    height: {
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
      height: +inputs.height.value,
    };

    const heightIsValid = submitData.height > 0 && submitData.height < 250;

    if (!heightIsValid) {
      setInputs((currentInputs) => {
        return {
          height: {
            value: currentInputs.height.value,
            isValid: heightIsValid,
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
    userdataCtx.addUserdata("height", submitData.height);
    navigation.navigate("FormWeight");
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
    >
      <View style={styles.containerStyle}>
        <Text style={styles.titleStyle}>{QUESTION[2]}</Text>
        <View style={styles.inputBackground}>
          <View
            style={[
              styles.inputContainer,
              inputIsFocused.height.isFocused && styles.focusedContainer,
              !inputs.height.isValid && styles.invalidContainer,
            ]}
          >
            <InputField
              onChangeText={onChangeHandler.bind(this, "height")}
              value={inputs.height.value}
              onFocus={onFocusHandler.bind(this, "height")}
              onBlur={onBlurHandler.bind(this, "height")}
              focusState={inputIsFocused.height.isFocused}
            />
          </View>
          <Text style={styles.descStyle}>{"(cm)"}</Text>
        </View>
        {isError && (
          <Text style={styles.errorTextStyle}>
            {"Mohon masukkan tinggi > 0 dan < 250"}
          </Text>
        )}
        <Button
          text=""
          showIcon={true}
          iconName="arrow-forward"
          onPress={submitHandler}
          style={styles.btnStyle}
        />
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${51 + "%"}` }]}></View>
        </View>
        <Text style={styles.descStyle}>Halaman 3 dari 6</Text>
      </View>
    </View>
  );
}

export default FormHeight;

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
    left: 50,
  },
});
