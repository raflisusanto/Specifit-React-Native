import { ScrollView, Text, View, Image, StyleSheet } from "react-native";
import ButtonNoOutline from "../../../components/ui/buttons/ButtonNoOutline";
import WorkoutCard from "../../../components/ui/cards/WorkoutCard";
import ProgramCard from "../../../components/ui/cards/ProgramCard";
import { PROGRAMS, WORKOUTS } from "../../../data/dummy-data";

function WorkoutScreen({ navigation }) {
  return (
    <>
      <Image
        source={require("../../../assets/images/element_workout.png")}
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
                textStyle={{ fontFamily: "OpenSans_600SemiBold", fontSize: 12 }}
                onPress={() => navigation.navigate("WorkoutList")}
              />
            </View>
            {WORKOUTS.slice(0, 3).map((workout) => {
              return (
                <WorkoutCard
                  id={workout.id}
                  image={workout.img}
                  title={workout.title}
                  categories={workout.ctgList}
                  time={workout.est}
                  count={workout.workoutList.length}
                  key={workout.id}
                />
              );
            })}
          </View>
        </View>
        <View style={{ marginTop: 10, backgroundColor: "white" }}>
          <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={{ fontSize: 16, fontFamily: "OpenSans_700Bold" }}>
                Program Olahraga 7 Hari
              </Text>
              <ButtonNoOutline
                text="Lihat Semua"
                containerStyle={{ marginLeft: "auto" }}
                textStyle={{ fontFamily: "OpenSans_600SemiBold", fontSize: 12 }}
                onPress={() => navigation.navigate("ProgramList")}
              />
            </View>
            {PROGRAMS.slice(0, 3).map((program) => {
              return (
                <ProgramCard
                  id={program.id}
                  image={program.img}
                  title={program.title}
                  time={program.workoutList.length}
                  categories={program.ctgList}
                  key={program.id}
                />
              );
            })}
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
