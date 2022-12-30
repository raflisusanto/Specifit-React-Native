import { View, StyleSheet, Text } from "react-native";
import Button from "../../../../components/ui/buttons/Button";
import QUESTION from "../../../../constants/question";
import COLORS from "../../../../constants/colors";
import InputField from "../../../../components/ui/InputField";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { UserdataContext } from "../../../../store/context/userdata-context";

function FormWeight() {
  const navigation = useNavigation();
  const userdataCtx = useContext(UserdataContext);
  const [isError, setIsError] = useState(false);

  const [inputs, setInputs] = useState({
    weight: {
      value: userdataCtx.userdata.weight.toString(),
      isValid: true,
    },
  });

  const [inputIsFocused, setInputIsFocused] = useState({
    weight: {
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
      weight: +inputs.weight.value,
    };

    const weightIsValid = submitData.weight > 30 && submitData.weight < 200;

    if (!weightIsValid) {
      setInputs((currentInputs) => {
        return {
          weight: {
            value: currentInputs.weight.value,
            isValid: weightIsValid,
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
    userdataCtx.addUserdata("weight", submitData.weight);
    console.log(submitData.weight);
    navigation.navigate("FormActivity");
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
    >
      <View style={styles.containerStyle}>
        <Text style={styles.titleStyle}>{QUESTION[3]}</Text>
        <View style={styles.inputBackground}>
          <View
            style={[
              styles.inputContainer,
              inputIsFocused.weight.isFocused && styles.focusedContainer,
              !inputs.weight.isValid && styles.invalidContainer,
            ]}
          >
            <InputField
              onChangeText={onChangeHandler.bind(this, "weight")}
              value={inputs.weight.value}
              onFocus={onFocusHandler.bind(this, "weight")}
              onBlur={onBlurHandler.bind(this, "weight")}
              focusState={inputIsFocused.weight.isFocused}
            />
          </View>
          <Text style={styles.descStyle}>{"(kg)"}</Text>
        </View>
        {isError && (
          <Text style={styles.errorTextStyle}>
            {"Mohon masukkan berat > 30 dan < 200"}
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
          <View style={[styles.progressBar, { width: `${68 + "%"}` }]}></View>
        </View>
        <Text style={styles.descStyle}>Halaman 4 dari 6</Text>
      </View>
    </View>
  );
}

export default FormWeight;

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
    left: 55,
  },
});
