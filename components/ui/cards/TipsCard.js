import Card from "./Card";
import { Pressable, Image, View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

function TipsCard({ id, image, title, style, containerStyle }) {
  const navigation = useNavigation();

  function onPressHandler() {
    navigation.navigate("Tips", {
      tipsId: id,
    });
  }

  return (
    <Pressable style={[styles.containerStyle, containerStyle]} onPress={onPressHandler}>
      <Card style={[styles.cardStyle, style]}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.imageStyle}
        ></Image>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
      </Card>
    </Pressable>
  );
}

export default TipsCard;

const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 14,
    width: "40%",
    marginRight: 10,
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
  titleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  titleStyle: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 16,
    marginTop: 5,
  },
});
