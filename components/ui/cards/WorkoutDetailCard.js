import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../../constants/colors";

function WorkoutDetailCard({ id, title, est }) {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.element}></View>
      <View style={styles.textContainerStyle}>
        <Text style={styles.titleStyle}>{title}</Text>
        <View style={styles.timeStyle}>
          <Ionicons name="time-outline" style={styles.iconStyle} />
          <Text style={styles.descStyle}>{est}</Text>
        </View>
      </View>
    </View>
  );
}

export default WorkoutDetailCard;

const styles = StyleSheet.create({
  timeStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    marginRight: 4,
  },
  element: {
    position: "absolute",
    marginLeft: -5,
    marginTop: 5,
    backgroundColor: COLORS.primary,
    width: 6,
    paddingHorizontal: 1,
    paddingVertical: 8,
    borderRadius: 10,
  },
  textContainerStyle: {
    marginLeft: 16,
    marginVertical: 10,
  },
  containerStyle: {
    borderRadius: 8,
    backgroundColor: "white",
    marginTop: 10,
  },
  titleStyle: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 14,
  },
  descStyle: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
  },
});
