import { View, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import COLORS from "../../../constants/colors";

function FilterButton({ id, title, setFilter, initActive }) {
  const [isActive, setIsActive] = useState(initActive);

  useEffect(() => {
    setIsActive(initActive);
  }, [initActive]);

  function onPressHandler() {
    if (isActive) {
      setIsActive(false);
      setFilter((currFilter) => {
        return { ...currFilter, [id]: false };
      });
    } else {
      setIsActive(true);
      setFilter((currFilter) => {
        return { ...currFilter, [id]: true };
      });
    }
  }

  return (
    <Pressable onPress={onPressHandler}>
      <View style={isActive ? styles.buttonActive : styles.buttonStyle}>
        <Text style={isActive ? styles.textActive : styles.textStyle}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

export default FilterButton;

const styles = StyleSheet.create({
  buttonStyle: {
    width: 115,
    marginRight: 4,
    marginVertical: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.neutral_300,
    backgroundColor: COLORS.neutral_400,
    borderRadius: 6,
  },
  buttonActive: {
    width: 115,
    marginRight: 4,
    marginVertical: 4,
    paddingVertical: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  textStyle: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
  },
  textActive: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
    color: "white",
  },
});
