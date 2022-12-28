import { useEffect, useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";

function DayButton({ isActiveIndex, day, onPress }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActiveIndex === day - 1) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isActiveIndex, day]);
  
  return (
    <Pressable onPress={onPress.bind(this, day - 1)}>
      <View style={isActive ? styles.tabStyleActive : styles.tabStyle}>
        <Text style={isActive ? styles.dayStyleActive : styles.dayStyle}>
          Day
        </Text>
        <Text style={isActive ? styles.dayNumStyleActive : styles.dayNumStyle}>
          {day}
        </Text>
      </View>
    </Pressable>
  );
}

export default DayButton;

const styles = StyleSheet.create({
  tabStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  dayStyle: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
  },
  dayNumStyle: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 24,
  },
  tabStyleActive: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },
  dayStyleActive: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 16,
    color: "white",
  },
  dayNumStyleActive: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 24,
    color: "white",
  },
});
