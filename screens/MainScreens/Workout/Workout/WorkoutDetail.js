import { Text, Image, StyleSheet, View, ScrollView } from "react-native";
import { WORKOUTS } from "../../../../data/dummy-data";
import WorkoutDetailCard from "../../../../components/ui/cards/WorkoutDetailCard";
import { useContext } from "react";
import { DataContext } from "../../../../store/context/data-context";

function WorkoutDetail({ route }) {
  const workoutId = route.params.workoutId;
  const dataCtx = useContext(DataContext);
  const selectedWorkout = dataCtx.WORKOUTS.find((workout) => workout.id === workoutId);
  return (
    <>
      <Image
        source={require("../../../../assets/images/workout_1.png")}
        style={styles.staticImage}
      ></Image>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop: 140, marginHorizontal: 20}}>
          <Text style={styles.titleStyle}>{selectedWorkout.title}</Text>
          <Text style={styles.descStyle}>{selectedWorkout.desc}</Text>
          {selectedWorkout.workoutList.map((workout, index) => {
            return (
              <WorkoutDetailCard
                title={workout}
                est={selectedWorkout.workoutEsts[index]}
                id={"o" + index + 1}
                key={"o" + index + 1}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

export default WorkoutDetail;

const styles = StyleSheet.create({
  staticImage: {
    alignSelf: "center",
    marginTop: -5,
    width: 400,
    height: 130,
    position: "absolute",
  },
  containerStyle: {
    backgroundColor: "white",
  },
  titleStyle: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
  },
  descStyle: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    marginBottom: 10,
  },
});
