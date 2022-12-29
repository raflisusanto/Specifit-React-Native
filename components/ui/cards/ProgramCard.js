import Card from "./Card";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function ProgramCard({ id, image, categories, title, time }) {
  const navigation = useNavigation();
  function onPressHandler() {
    navigation.navigate('WorkoutStack', {
      screen: 'ProgramDetail',
      params: { programId: id },
    });
  }
  return (
    <Pressable style={styles.containerStyle} onPress={onPressHandler}>
      <Card style={styles.cardStyle}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.imageStyle}
        ></Image>
        <View style={styles.detailContainer}>
          <View>
            <Text style={styles.categoriesStyles}>{categories.join(", ")}</Text>
          </View>
          <Text style={styles.titleStyle}>{title}</Text>
          <View style={styles.descriptionContainer}>
            <Ionicons name="time-outline" style={styles.iconStyle}></Ionicons>
            <Text style={styles.descriptionStyle}>{time} hari</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

export default ProgramCard;

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 14,
  },
  cardStyle: {
    elevation: 2,
    padding: 0,
  },
  imageStyle: {
    width: "100%",
    height: 124,
    borderRadius: 4,
  },
  detailContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  categoriesStyles: {
    fontFamily: "OpenSans_300Light",
    fontSize: 12,
  },
  titleStyle: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
    marginTop: 5,
  },
  descriptionContainer: { flexDirection: "row", alignItems: "center" },
  iconStyle: {
    marginRight: 5,
  },
  descriptionStyle: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 14,
  },
});
