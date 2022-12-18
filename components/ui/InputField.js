import { TextInput, StyleSheet, Text } from "react-native";
import COLORS from "../../constants/colors";

function InputField({
  placeholder,
  onChangeText,
  value,
  onBlur,
  onFocus,
  focusState,
  secureTextEntry,
}) {
  return (
    <>
      <TextInput
        maxLength={50}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder={placeholder}
        style={[styles.input, !focusState && styles.blurText]}
        onChangeText={onChangeText}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
      ></TextInput>
    </>
  );
}

export default InputField;

const styles = StyleSheet.create({
  input: {
    color: COLORS.primary,
    fontFamily: "OpenSans_400Regular",
    borderWidth: 3,
    borderColor: "transparent",
  },
  invalidText: {
    color: "red",
    fontFamily: "OpenSans_400Regular",
    fontSize: 12,
  },
  blurText: {
    color: "#C8C8C8",
  },
});
