import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

function EditProfileScreen() {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>Ini Kris</Text>
      <View style={{width: 100, height: 100, borderRadius: 100, backgroundColor: COLORS.primary}}></View>
    </View>
  );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  textStyle: {
    color: "red",
  },
  containerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
