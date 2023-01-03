import { View, Text, FlatList, StyleSheet } from "react-native";
import Button from "../../../../components/ui/buttons/Button";
import WorkoutCard from "../../../../components/ui/cards/WorkoutCard";
import { WORKOUTS } from "../../../../data/dummy-data";
import COLORS from "../../../../constants/colors";
import WORKOUTFILTER from "../../../../constants/filters";
import { useNavigation } from "@react-navigation/native";

function WorkoutList({ route }) {
  let filtersObj;
  let filters;
  const navigation = useNavigation();
  if (route.params) {
    filtersObj = route.params;
    filters = WORKOUTFILTER.filter((filter) => {
      if (filtersObj[filter.id]) {
        return filter.title;
      }
    }).map((filterObj) => filterObj.title);
  } else {
    filters = [];
  }

  function renderWorkoutItem({ item }) {
    if (filters.length === 0) {
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
    } else {
      for (let i = 0; i < item.ctgList.length; i++) {
        if (filters.includes(item.ctgList[i])) {
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
      }
    }
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
          onPress={
            route.params
              ? () => navigation.navigate("WorkoutFilter", route.params)
              : () => navigation.navigate("WorkoutFilter")
          }
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
