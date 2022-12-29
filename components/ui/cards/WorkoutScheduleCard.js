import Card from "./Card";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function WorkoutScheduleCard({ id, title, est }) {
  const navigation = useNavigation();

  function onPressHandler() {
    navigation.navigate('WorkoutStack', {
      screen: 'WorkoutDetail',
      params: { workoutId: id },
    });
  }

  return (
    <Pressable onPress={onPressHandler}>
      <Card style={styles.cardStyle}>
        <Text style={styles.olahragaTitle}>{title}</Text>
        <View style={styles.olahragaDescContainer}>
          <Ionicons name="time-outline" style={{ marginRight: 4 }} />
          <Text style={styles.olahragaDesc}>{est}</Text>
        </View>
      </Card>
    </Pressable>
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
