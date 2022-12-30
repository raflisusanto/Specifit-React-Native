import { View, Text, FlatList, StyleSheet } from "react-native";
import Button from "../../../../components/ui/buttons/Button";
import WorkoutCard from "../../../../components/ui/cards/WorkoutCard";
import { WORKOUTS } from "../../../../data/dummy-data";
import COLORS from "../../../../constants/colors";

function WorkoutList() {
  function renderWorkoutItem({ item }) {
    return (
      <WorkoutCard
        id={item.id}
        image={item.img}
        title={item.title}
        categories={item.ctgList}
        time={item.est}
        count={item.workoutList.length}
        key={item.id}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 20, marginTop: 70 }}>
        <Button
          text="Filter"
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            width: "24%",
            borderRadius: 10,
            height: 30,
            borderWidth: 1,
            borderColor: COLORS.primary,
            marginVertical: 16,
          }}
          showIcon={true}
          iconName="filter-list"
          iconStyle={{ color: "black" }}
          textStyle={{ color: "black", fontSize: 12 }}
        />
        <Text
          style={{
            fontFamily: "OpenSans_700Bold",
            fontSize: 20,
            marginTop: 10,
          }}
        >
          Olahraga
        </Text>
        <FlatList
          data={WORKOUTS}
          keyExtractor={(workout) => workout.id}
          renderItem={renderWorkoutItem}
        />
      </View>
    </View>
  );
}

export default WorkoutList;

const styles = StyleSheet.create({});
