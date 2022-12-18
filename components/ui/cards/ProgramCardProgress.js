import { Pressable, Image, View, Text, StyleSheet } from "react-native";
import Card from "./Card";
import COLORS from "../../../constants/colors";

function ProgramCardProgress({ image, title, categories, percentage}) {
  return (
    <Pressable style={styles.containerStyle}>
      <Card style={styles.cardStyle}>
        <Image
          source={image}
          style={styles.imageContainer}
        ></Image>
        <View style={styles.workoutDetailsContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.categoryText}>{categories.join(", ")}</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, {width: `${percentage + '%'}`}]}></View>
          </View>
          <Text style={styles.progressText}>{percentage}%</Text>
        </View>
      </Card>
    </Pressable>
  );
}

export default ProgramCardProgress;

const styles = StyleSheet.create({
  progressContainer: {
    marginTop: 10,
    height: 5,
    borderRadius: 10,
    backgroundColor: COLORS.neutral_400,
    overflow: "hidden",
  },
  progressBar: {
    height: 10,
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontFamily: "OpenSans_300Light",
    fontSize: 14,
  },
  titleText: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 14,
  },
  workoutDetailsContainer: { marginLeft: 16, width: "70%" },
  imageContainer: { width: 79, height: 72, borderRadius: 6 },
  cardStyle: { flexDirection: "row", elevation: 2, padding: 14 },
  containerStyle: { marginTop: 14 },
  progressText: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
    marginTop: 6,
    marginLeft: "auto",
  },
});
