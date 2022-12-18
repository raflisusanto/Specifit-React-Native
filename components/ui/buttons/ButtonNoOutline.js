import { Pressable, View, Text, StyleSheet } from "react-native";
import colors from "../../../constants/colors";

function ButtonNoOutline({ text, onPress, style, containerStyle, textStyle }) {
  return (
    <Pressable onPress={onPress} style={containerStyle}>
      <View style={style}>
        <Text style={[styles.textStyles, textStyle]}>{text}</Text>
      </View>
    </Pressable>
  );
}

export default ButtonNoOutline;

const styles = StyleSheet.create({
  textStyles: {
    color: colors.primary,
  },
});
