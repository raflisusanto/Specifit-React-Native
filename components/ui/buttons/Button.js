import { View, Text, StyleSheet, Pressable } from "react-native";
import colors from "../../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";

function Button({
  text,
  onPress,
  style,
  textStyle,
  showIcon,
  iconName,
  iconStyle,
}) {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.buttonStyle, style]}>
        {showIcon && (
          <MaterialIcons
            name={iconName}
            style={[{ marginRight: 10, color: "white" }, iconStyle]}
            size={16}
          />
        )}
        <Text style={[styles.textStyle, textStyle]}>{text}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 40,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  textStyle: {
    color: "white",
    fontFamily: "OpenSans_600SemiBold",
  },
});
