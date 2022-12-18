import Card from "./Card";
import { View, Image, Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../../constants/colors";

function WorkoutCard({ image, title, category, time, count }) {
  return (
    <Pressable style={styles.containerStyle}>
      <Card style={styles.cardStyle}>
        <Image source={image} style={styles.imageContainer}></Image>
        <View style={styles.workoutDetailsContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.categoryText}>{category}</Text>
          <View style={styles.descriptionContainer}>
            <Ionicons
              name="time-outline"
              color={COLORS.neutral_500}
              style={styles.iconStyle}
            ></Ionicons>
            <Text style={{ color: COLORS.neutral_500 }}>{time} - </Text>
            <Text style={{ color: COLORS.neutral_500 }}>{count} olahraga</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

export default WorkoutCard;

const styles = StyleSheet.create({
  iconStyle: {
    marginRight: 6,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
  },
  categoryText: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
  },
  titleText: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
  },
  workoutDetailsContainer: { marginLeft: 16 },
  imageContainer: { width: 79, height: 72, borderRadius: 6 },
  cardStyle: { flexDirection: "row", elevation: 2, padding: 14 },
  containerStyle: { marginTop: 14 },
});
