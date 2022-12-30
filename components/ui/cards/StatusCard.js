import Card from "./Card";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";

function StatusCard({
  title,
  desc,
  score,
  descScore,
  iconName,
  showTextIcon = false,
  textIcon,
}) {
  return (
    <Card style={styles.cardStatus}>
      <View style={styles.statusIconStyle}>
        {!showTextIcon ? (
          <FontAwesome5 name={iconName} size={16} style={{ color: "white" }} />
        ) : (
          <Text style={styles.textIcon}>{textIcon}</Text>
        )}
      </View>
      <View>
        <Text style={styles.statusTitleStyle}>{title}</Text>
        <Text style={styles.statusDescStyle}>{desc}</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.statusScore}>{score}</Text>
          <Text style={styles.statusScoreDesc}>{descScore}</Text>
        </View>
      </View>
    </Card>
  );
}

export default StatusCard;

const styles = StyleSheet.create({
  statusIconStyle: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: -18,
    position: "absolute",
    overflow: "hidden",
  },
  statusTitleStyle: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 13,
    marginTop: 20,
    textAlign: "center",
  },
  statusDescStyle: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 8,
    marginTop: 4,
    textAlign: "center",
    height: 26,
  },
  statusScore: {
    fontFamily: "OpenSans_700Bold",
    color: COLORS.primary,
    fontSize: 22,
  },
  statusScoreDesc: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 14,
  },
  scoreContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.neutral_400,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  cardStatus: {
    elevation: 2,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 34,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginRight: 3,
  },
  textIcon: {
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 12,
    color: "white",
  },
});
