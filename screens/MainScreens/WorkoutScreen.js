import { ScrollView, Text, View, Image, StyleSheet } from "react-native";
import ButtonNoOutline from "../../components/ui/buttons/ButtonNoOutline";
import WorkoutCard from "../../components/ui/cards/WorkoutCard";
import ProgramCard from "../../components/ui/cards/ProgramCard";

function WorkoutScreen() {
  return (
    <>
      <Image
        source={require("../../assets/images/element_workout.png")}
        style={styles.staticImage}
      ></Image>
      <Text
        style={{
          fontFamily: "OpenSans_700Bold",
          fontSize: 24,
          color: "white",
          marginVertical: 55,
          marginHorizontal: 20,
        }}
      >
        Olahraga
      </Text>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ backgroundColor: "white" }}>
          <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 16, fontFamily: "OpenSans_700Bold" }}>
                Olahraga
              </Text>
              <ButtonNoOutline
                text="Lihat Semua"
                containerStyle={{ marginLeft: "auto" }}
                textStyle={{fontFamily: 'OpenSans_600SemiBold', fontSize: 12}}
              />
            </View>
            <WorkoutCard
              image={require("../../assets/images/workout_1.png")}
              title="Auto Sixpath by Rapli"
              category="Abs"
              time="15 Menit"
              count="4"
            />
            <WorkoutCard
              image={require("../../assets/images/workout_2.png")}
              title="Latihan Lengan"
              category="Arms"
              time="15 menit"
              count="4"
            />
            <WorkoutCard
              image={require("../../assets/images/workout_3.png")}
              title="Penghilang Menbubs"
              category="Chest"
              time="15 menit"
              count="4"
            />
          </View>
        </View>
        <View style={{ marginTop: 10, backgroundColor: "white" }}>
          <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 16, fontFamily: "OpenSans_700Bold" }}>
                Program Olahraga 7 Hari
              </Text>
              <ButtonNoOutline
                text="Lihat Semua"
                containerStyle={{ marginLeft: "auto" }}
                textStyle={{fontFamily: 'OpenSans_600SemiBold', fontSize: 12}}
              />
            </View>
            <ProgramCard
              image={require("../../assets/images/program_1.png")}
              title="Menurunkan Berat Badan"
              time="7 Hari"
              categories={["Lose Weight"]}
            />
            <ProgramCard
              image={require("../../assets/images/program_2.png")}
              title="Program Strength Training"
              time="7 Hari"
              categories={["Lose Weight", "Strength"]}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default WorkoutScreen;

const styles = StyleSheet.create({
  staticImage: {
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: -5,
    position: "absolute",
  },
});
