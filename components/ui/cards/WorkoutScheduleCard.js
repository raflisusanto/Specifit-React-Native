import Card from "./Card";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function WorkoutScheduleCard({ title, est }) {
  return (
    <Card style={styles.cardStyle}>
      <Text style={styles.olahragaTitle}>{title}</Text>
      <View style={styles.olahragaDescContainer}>
        <Ionicons name="time-outline" style={{ marginRight: 4 }} />
        <Text style={styles.olahragaDesc}>{est}</Text>
      </View>
    </Card>
  );
}

export default WorkoutScheduleCard;

const styles = StyleSheet.create({
  olahragaTitle: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
  },
  olahragaDesc: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
  },
  olahragaDescContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardStyle: {
    elevation: 2,
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 12,
  },
});
