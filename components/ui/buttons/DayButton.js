import { useEffect, useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../../constants/colors";

function DayButton({ isActiveIndex, day, onPress, isDone }) {
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
        {isDone && <View style={styles.circle}></View>}
        {isDone && (
          <Ionicons
            name="checkmark-circle"
            style={styles.iconStyle}
            size={20}
          />
        )}
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
    paddingHorizontal: 15,
    paddingVertical: 10,
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
    paddingHorizontal: 15,
    paddingVertical: 10,
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
  iconStyle: {
    position: "absolute",
    color: COLORS.success,
    right: 0,
    bottom: 0,
  },
  circle: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: "white",
    right: 5,
    bottom: 5,
  },
});
