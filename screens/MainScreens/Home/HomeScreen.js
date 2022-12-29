import { Text, Image, View, ScrollView, StyleSheet } from "react-native";
import { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import ButtonNoOutline from "../../../components/ui/buttons/ButtonNoOutline";
import COLORS from "../../../constants/colors";
import Card from "../../../components/ui/cards/Card";
import Button from "../../../components/ui/buttons/Button";
import CategoryButton from "../../../components/ui/buttons/CategoryButton";
import ProgramCardProgress from "../../../components/ui/cards/ProgramCardProgress";
import TipsCard from "../../../components/ui/cards/TipsCard";
import { PROGRAMS, TIPS } from "../../../data/dummy-data";
import { ProgramContext } from "../../../store/context/program-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";

function sum(arr) {
  let sum = 0;
  arr.forEach((num) => {
    sum += num;
  });
  return sum;
}

function HomeScreen() {
  const cardText = `Lengkapi Datamu dan\ndapatkan Rekomendasi\nProgram dari Kami`;
  const programCtx = useContext(ProgramContext);
  const navigation = useNavigation();
  useIsFocused(); // Re-renders component on navigation

  function seeAllProgramHandler() {
    navigation.navigate("OnGoingWorkoutList");
  }

  function seeAllListHandler() {
    navigation.navigate("TipsList");
  }

  return (
    <>
      <Image
        source={require("../../../assets/images/element_home.png")}
        style={styles.staticImage}
      ></Image>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
            marginTop: 40,
          }}
        >
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 24,
              color: "white",
            }}
          >
            Halo, Rita
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 4,
            marginHorizontal: 20,
            padding: 10,
            marginVertical: 14,
          }}
        >
          <Ionicons
            name="search"
            color={COLORS.neutral_500}
            size={16}
            style={{ marginRight: 10 }}
          ></Ionicons>
          <Text style={{ fontFamily: "OpenSans_400Regular", fontSize: 14 }}>
            Cari program diet aku bangetz
          </Text>
        </View>
      </View>
      <ScrollView style={{ marginTop: 10 }}>
        <Card
          style={{ marginHorizontal: 20, marginTop: 10, overflow: "hidden" }}
        >
          <Image
            source={require("../../../assets/images/element_card_form_1.png")}
            style={styles.cardImagesRight}
          ></Image>
          <Image
            source={require("../../../assets/images/element_card_form_2.png")}
            style={styles.cardImagesLeft}
          ></Image>
          <Text style={{ fontFamily: "OpenSans_700Bold", fontSize: 14 }}>
            {cardText}
          </Text>
          <Button
            text="Klik disini"
            style={{
              width: "40%",
              height: 30,
              borderRadius: 20,
              marginVertical: 20,
            }}
          />
        </Card>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionMargins}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontFamily: "OpenSans_700Bold", fontSize: 16 }}>
                Pilih dari Kategori
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              style={{ marginRight: -20 }}
              showsHorizontalScrollIndicator={false}
            >
              <CategoryButton
                image={require("../../../assets/images/ctg_1.png")}
                category="Legs"
              />
              <CategoryButton
                image={require("../../../assets/images/ctg_2.png")}
                category="Arms"
              />
              <CategoryButton
                image={require("../../../assets/images/ctg_3.png")}
                category="Fat Burning"
              />
              <CategoryButton
                image={require("../../../assets/images/ctg_4.png")}
                category="Running"
              />
              <CategoryButton
                image={require("../../../assets/images/ctg_5.png")}
                category="Yoga"
              />
            </ScrollView>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionMargins}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontFamily: "OpenSans_700Bold", fontSize: 16 }}>
                Program Olahraga Saya
              </Text>
              {programCtx.programList.length > 0 && (
                <ButtonNoOutline
                  text="Lihat Semua"
                  containerStyle={{ marginLeft: "auto" }}
                  textStyle={{
                    fontFamily: "OpenSans_600SemiBold",
                    fontSize: 12,
                  }}
                  onPress={seeAllProgramHandler}
                />
              )}
            </View>
            <View>
              {programCtx.programList.length > 0 ? (
                PROGRAMS.slice(0, 4).map((program) => {
                  return (
                    programCtx.programList.includes(program.id) && (
                      <ProgramCardProgress
                        id={program.id}
                        image={program.img}
                        title={program.title}
                        categories={program.ctgList}
                        percentage={
                          (sum(program.statusDayList) /
                            program.ctgList.length) *
                          100
                        }
                        key={program.id}
                      />
                    )
                  );
                })
              ) : (
                <Text style={styles.feedbackStyle}>
                  Belum ada program yang dipilih
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionMargins}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontFamily: "OpenSans_700Bold", fontSize: 16 }}>
                Tips untuk Kamu
              </Text>
              <ButtonNoOutline
                text="Lihat Semua"
                containerStyle={{ marginLeft: "auto" }}
                textStyle={{ fontFamily: "OpenSans_600SemiBold", fontSize: 12 }}
                onPress={seeAllListHandler}
              />
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ marginRight: -20 }}
            >
              {TIPS.slice(0, 5).map((tip) => {
                return (
                  <TipsCard
                    id={tip.id}
                    image={tip.img}
                    title={tip.title}
                    key={tip.id}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  staticImage: {
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: -5,
    position: "absolute",
    overflow: "hidden",
  },
  cardImagesRight: {
    resizeMode: "contain",
    alignSelf: "flex-end",
    top: -30,
    right: -30,
    position: "absolute",
  },
  cardImagesLeft: {
    resizeMode: "contain",
    alignSelf: "flex-start",
    bottom: -120,
    left: -30,
    position: "absolute",
  },
  sectionContainer: {
    backgroundColor: "white",
    marginTop: 10,
  },
  sectionMargins: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  feedbackStyle: {
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    marginTop: 10,
  },
});
