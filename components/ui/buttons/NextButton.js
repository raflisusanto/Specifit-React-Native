import { Text, View, StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

function NextButton() {
  return (
    <View>
      <Text style={styles.textStyle}>Lanjut</Text>
    </View>
  );
}

export default NextButton;

const styles = StyleSheet.create({
  textStyle: {
    color: COLORS.primary,
    fontFamily: 'OpenSans_700Bold',
    fontSize: 14,
    marginTop: 12,
    marginRight: 20
  },
});
