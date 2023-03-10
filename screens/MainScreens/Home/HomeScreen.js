import {
  Text,
  Image,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import ButtonNoOutline from "../../../components/ui/buttons/ButtonNoOutline";
import COLORS from "../../../constants/colors";
import Card from "../../../components/ui/cards/Card";
import Button from "../../../components/ui/buttons/Button";
import CategoryButton from "../../../components/ui/buttons/CategoryButton";
import ProgramCardProgress from "../../../components/ui/cards/ProgramCardProgress";
import TipsCard from "../../../components/ui/cards/TipsCard";
import { ProgramContext } from "../../../store/context/program-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { UserdataContext } from "../../../store/context/userdata-context";
import StatusCard from "../../../components/ui/cards/StatusCard";
import { DataContext } from "../../../store/context/data-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase/firebase";
import { getAuth } from "firebase/auth";

function sum(arr) {
  let sum = 0;
  arr.forEach((num) => {
    sum += num;
  });
  return sum;
}

function HomeScreen() {
  const cardText = `Lengkapi Datamu dan\ndapatkan Rekomendasi\nProgram dari Kami`;
  const cardTextRecommend = `Lihat Program Rekomendasi\nKami`;
  const programCtx = useContext(ProgramContext);
  const userdataCtx = useContext(UserdataContext);
  const dataCtx = useContext(DataContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Re-renders component on navigation
  const [username, setUsername] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (isFocused) {
      userdataCtx.getUserdata();
      if (userdataCtx.userdata.isFilled) {
        userdataCtx.calculateIMT();
        userdataCtx.calculateCalPerDay();
        userdataCtx.calculateRecommendation();
      }
    }
  }, [isFocused]);

  useEffect(() => {
    try {
      const getName = async () => {
        try {
          const data = await getDoc(doc(db, "users", user.uid));
          const usersData = data.data();
          setUsername(usersData.name);
        } catch (e) {
          Alert.alert(e.message);
        }
      };
      getName();
    } catch (e) {
      Alert.alert(e.message);
    }
  }, [isFocused]);

  useEffect(() => {
    // Get Data
    if (isFocused) {
      dataCtx.getWorkoutData();
      dataCtx.getWorkoutProgramData();
      dataCtx.getTips();
      programCtx.getProgramStatus();
      dataCtx.getProgramStatus();
    }
  }, [isFocused]);

  function seeAllProgramHandler() {
    navigation.navigate("OnGoingWorkoutList");
  }

  function seeAllListHandler() {
    navigation.navigate("TipsList");
  }

  function seeFormHandler() {
    navigation.navigate("FormScreen");
  }

  function seeRecommendationHandler() {
    userdataCtx.calculateRecommendation();
    navigation.navigate("ProgramList", {
      ...userdataCtx.userdata.recommendation,
    });
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
              zIndex: 3,
            }}
          >
            Halo, {username ? username : "User"}
          </Text>
        </View>
      </View>
      <ScrollView style={{ marginTop: 25 }}>
        {!userdataCtx.userdata?.isFilled ? (
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
              onPress={seeFormHandler}
            />
          </Card>
        ) : (
          <>
            <View style={styles.sectionContainer}>
              <View style={styles.sectionMargins}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontFamily: "OpenSans_700Bold", fontSize: 16 }}
                  >
                    Status Kamu Sekarang
                  </Text>
                  <Pressable onPress={seeFormHandler}>
                    <Feather
                      name="edit"
                      size={20}
                      style={{ color: COLORS.primary }}
                    />
                  </Pressable>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <StatusCard
                    title={"Indeks Massa\nTubuh"}
                    desc={"(IMT)"}
                    score={userdataCtx.userdata.imt}
                    descScore={userdataCtx.userdata.imtStatus}
                    iconName="heartbeat"
                  />
                  <StatusCard
                    title={"Asupan Kalori\nper Hari"}
                    desc={"Untuk memperta-\nhankan berat badan"}
                    score={userdataCtx.userdata.calPerDayHold}
                    descScore="kkal"
                    showTextIcon={true}
                    textIcon="kkal"
                  />
                  <StatusCard
                    title={"Asupan Kalori\nper Hari"}
                    desc={"Untuk menurunkan berat\nbadan (1 kg/minggu)"}
                    score={userdataCtx.userdata.calPerDayLose}
                    descScore="kkal"
                    showTextIcon={true}
                    textIcon="kkal"
                  />
                </View>
              </View>
            </View>
            <Card
              style={{
                marginHorizontal: 20,
                marginTop: 10,
                overflow: "hidden",
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                paddingVertical: 16,
              }}
            >
              <Image
                source={require("../../../assets/images/element_card_recommendation.png")}
                style={styles.recommendCardImage}
              ></Image>
              <View style={{ marginLeft: "auto" }}>
                <Text
                  style={{
                    fontFamily: "OpenSans_600SemiBold",
                    fontSize: 12,
                    color: "white",
                  }}
                >
                  {cardTextRecommend}
                </Text>
                <Button
                  text="Klik disini"
                  style={{
                    width: "80%",
                    height: 22,
                    borderRadius: 20,
                    marginTop: 10,
                    backgroundColor: "white",
                  }}
                  textStyle={{ color: "black", fontSize: 12 }}
                  onPress={seeRecommendationHandler}
                />
              </View>
            </Card>
          </>
        )}
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
                ctg_id="legs"
              />
              <CategoryButton
                image={require("../../../assets/images/ctg_2.png")}
                category="Arms"
                ctg_id="arms"
              />
              <CategoryButton
                image={require("../../../assets/images/ctg_3.png")}
                category="Fat Burning"
                ctg_id="fatburn"
              />
              <CategoryButton
                image={require("../../../assets/images/ctg_4.png")}
                category="Chest"
                ctg_id="chest"
              />
              <CategoryButton
                image={require("../../../assets/images/ctg_5.png")}
                category="Abs"
                ctg_id="abs"
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
              {dataCtx.STATUS?.programid.length > 0 && (
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
              {dataCtx.STATUS?.programid.length > 0 ? (
                dataCtx.PROGRAMS.slice(0, 4).map((program) => {
                  return (
                    dataCtx.STATUS.programid.includes(program.id) && (
                      <ProgramCardProgress
                        id={program.id}
                        image={program.img}
                        title={program.title}
                        categories={program.ctgList}
                        percentage={
                          (sum(program.statusDayList) /
                            program.workoutList.length) *
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
              {dataCtx.TIPS.slice(0, 5).map((tip) => {
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
    marginTop: -55,
    position: "absolute",
    overflow: "hidden",
    zIndex: 2,
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
  recommendCardImage: {
    resizeMode: "contain",
    alignSelf: "flex-start",
    bottom: 0,
    left: 20,
    position: "absolute",
  },
});
