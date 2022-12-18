import { View, Text, StyleSheet, Image } from "react-native";
import COLORS from "../constants/colors";
import NextButton from "./ui/buttons/NextButton";
import DoneButton from "./ui/buttons/DoneButton";
import AppIntroSlider from "react-native-app-intro-slider";
import SLIDES from '../constants/onboarding';

function OnBoarding({onDone}) {
  return (
    <AppIntroSlider
      style={{ flex: 1 }}
      data={SLIDES}
      activeDotStyle={styles.activeDotStyle}
      renderNextButton={NextButton}
      renderDoneButton={DoneButton}
      onDone={onDone}
      renderItem={({ item }) => {
        return (
          <View style={styles.listContainer}>
            <Image source={item.image} style={styles.imageStyle}></Image>
            <Text style={styles.titleStyle}>{item.title}</Text>
            <Text style={styles.textStyle}>{item.text}</Text>
          </View>
        );
      }}
    />
  );
}

export default OnBoarding;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 150,
    marginHorizontal: "7%",
  },
  imageStyle: {
    marginBottom: 50,
  },
  titleStyle: {
    fontFamily: 'OpenSans_700Bold',
    fontSize: 16,
    textAlign: "left",
    marginBottom: 14,
  },
  textStyle: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 16,
    textAlign: "left",
  },
  activeDotStyle: {
    width: 30,
    backgroundColor: COLORS.primary,
  },
});
