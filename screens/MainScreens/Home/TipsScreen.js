import { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import COLORS from "../../../constants/colors";
import { DataContext } from "../../../store/context/data-context";

function TipsScreen({ route }) {
  const tipsId = route.params.tipsId;
  const dataCtx = useContext(DataContext);
  const selectedTips = dataCtx.TIPS.find((tips) => tips.id === tipsId);
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.sectionMargin, { marginTop: 90 }]}>
        <Text style={styles.titleStyle}>{selectedTips.title}</Text>
        <View style={styles.descContainer}>
          <Text style={styles.descStyle}>by {selectedTips.author}</Text>
          <Text style={styles.descStyle}> • </Text>
          <Text style={styles.descStyle}>{selectedTips.date}</Text>
        </View>
      </View>
      <Image
        source={{
          uri: selectedTips.img,
        }}
        style={styles.imageStyle}
      ></Image>
      <View style={styles.sectionMargin}>
        <Text style={styles.articleStyle}>{selectedTips.article}</Text>
      </View>
    </View>
  );
}

export default TipsScreen;

const styles = StyleSheet.create({
  sectionMargin: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  titleStyle: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
  },
  descContainer: {
    flexDirection: "row",
  },
  descStyle: {
    fontSize: 14,
    color: COLORS.neutral_500,
    fontFamily: "OpenSans_400Regular",
    marginRight: 5,
    marginVertical: 5,
  },
  articleStyle: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
  },
  imageStyle: {
    width: 400,
    height: 220,
    marginVertical: 10,
  },
});
