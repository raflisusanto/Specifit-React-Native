import { View, Pressable, Image, Text, StyleSheet } from "react-native";

function CategoryButton({ image, category, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.containerStyle}>
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
  }
});
