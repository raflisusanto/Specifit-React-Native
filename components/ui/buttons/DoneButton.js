import { Text, View, StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

function DoneButton() {
  return (
    <View style={styles.buttonStyle}>
      <Text style={styles.textStyle}>Mulai</Text>
    </View>
  );
}

export default DoneButton;

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  textStyle: {
    color: "white",
    fontFamily: "OpenSans_700Bold",
    fontSize: 12,
  },
});
