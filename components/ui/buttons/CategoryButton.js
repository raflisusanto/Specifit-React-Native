import { useNavigation } from "@react-navigation/native";
import { View, Pressable, Image, Text, StyleSheet } from "react-native";

function CategoryButton({ image, category, ctg_id }) {
  const navigation = useNavigation();
  const initialFilter = {
    abs: false,
    arms: false,
    legs: false,
    fatburn: false,
    chest: false,
    shoulder: false,
    lessten: false,
    moreten: false,
  };

  function onPressHandler() {
    navigation.navigate("WorkoutList", {...initialFilter, [ctg_id]: true});
  }

  return (
    <Pressable onPress={onPressHandler} style={styles.containerStyle}>
      <View style={styles.buttonStyle}>
        <Image source={image}></Image>
        <Text style={styles.textStyle}>{category}</Text>
      </View>
    </Pressable>
  );
}

export default CategoryButton;

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: "center",
    marginTop: 10,
  },
  textStyle: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
    marginTop: 6,
  },
  containerStyle: {
    marginRight: 24,
  },
});
