import { View, Image, Text, StyleSheet } from "react-native";
import Button from "../../../../components/ui/buttons/Button";
import { useNavigation } from "@react-navigation/native";

function FormScreen() {
  const descText =
    "Kalkulasi kebutuhan kalori dan dapatkan rekomendasi program spesial untuk kamu dengan mengisi beberapa pertanyaan";
  const navigation = useNavigation();

  function goToFormHandler() {
    navigation.navigate("FormGender");
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.containerStyle}>
        <Image
          source={require("../../../../assets/images/element_form.png")}
          style={styles.imgStyle}
        ></Image>
        <Text style={styles.titleStyle}>Halo, Rita</Text>
        <Text style={styles.descStyle}>{descText}</Text>
        <Button
          text="Mulai"
          style={styles.btnStyle}
          onPress={goToFormHandler}
        />
      </View>
    </View>
  );
}

export default FormScreen;

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 100,
    marginHorizontal: 20,
    alignItems: "center",
  },
  imgStyle: {
    marginTop: 40,
    marginLeft: 20,
  },
  titleStyle: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
    marginTop: 80,
  },
  descStyle: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    marginTop: 10,
    textAlign: "center",
  },
  btnStyle: {
    marginTop: 100,
    paddingHorizontal: 90,
    height: 45,
    borderRadius: 10,
  },
});
