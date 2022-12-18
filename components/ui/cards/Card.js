import { View, StyleSheet } from "react-native";

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 4,
    padding: 20,
  },
});
