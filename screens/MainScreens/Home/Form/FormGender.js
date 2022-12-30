import { View, StyleSheet, Text, Pressable } from "react-native";
import Button from "../../../../components/ui/buttons/Button";
import QUESTION from "../../../../constants/question";
import COLORS from "../../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { UserdataContext } from "../../../../store/context/userdata-context";

function FormGender() {
  const navigation = useNavigation();
  const userdataCtx = useContext(UserdataContext);
  const [isActive, setIsActive] = useState(userdataCtx.userdata.gender);
  const [isError, setIsError] = useState(false);
  function questionOneHandler(index) {
    setIsActive(index);
  }

  function nextPageHandler() {
    if (isActive === 0) {
      setIsError(true);
      return;
    }
    userdataCtx.addUserdata("gender", isActive);
    navigation.navigate("FormAge");
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
    >
      <View style={styles.containerStyle}>
        <Text style={styles.titleStyle}>{QUESTION[0]}</Text>
        <View>
          <Pressable onPress={questionOneHandler.bind(this, 1)}>
            <View
              style={isActive === 1 ? styles.activeStyle : styles.defaultStyle}
            >
              <Text
                style={
                  isActive === 1 ? styles.descStyleActive : styles.descStyle
                }
              >
                Laki-Laki
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={questionOneHandler.bind(this, 2)}>
            <View
              style={isActive === 2 ? styles.activeStyle : styles.defaultStyle}
            >
              <Text
                style={
                  isActive === 2 ? styles.descStyleActive : styles.descStyle
                }
              >
                Perempuan
              </Text>
            </View>
          </Pressable>
          {isError && (
            <Text style={styles.errorTextStyle}>
              Pilih dahulu sebelum melanjutkan
            </Text>
          )}
        </View>
        <Button
          text=""
          showIcon={true}
          iconName="arrow-forward"
          onPress={nextPageHandler}
          style={styles.btnStyle}
        />
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${17 + "%"}` }]}></View>
        </View>
        <Text style={styles.pagingStyle}>Halaman 1 dari 6</Text>
      </View>
    </View>
  );
}

export default FormGender;

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  btnStyle: {
    borderRadius: 10,
    padding: 10,
    marginTop: 100,
    alignItems: "center",
    flexDirection: "row",
    width: "18%",
    height: 50,
  },
  pagingStyle: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
  },
  progressContainer: {
    marginTop: 200,
    height: 10,
    borderRadius: 10,
    backgroundColor: COLORS.neutral_400,
    overflow: "hidden",
    width: 150,
  },
  progressBar: {
    height: 10,
    backgroundColor: COLORS.primary,
  },
  titleStyle: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  descStyle: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
  },
  descStyleActive: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
    color: "white",
  },
  defaultStyle: {
    borderWidth: 1,
    borderColor: COLORS.neutral_300,
    paddingVertical: 15,
    paddingHorizontal: 120,
    marginTop: 10,
    borderRadius: 4,
  },
  activeStyle: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 120,
    marginTop: 10,
    borderRadius: 4,
  },
  errorTextStyle: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
    color: COLORS.primary,
    position: 'absolute',
    top: 140,
    left: 50,
  },
});
