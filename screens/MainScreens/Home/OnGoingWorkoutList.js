import { View, StyleSheet, Text, FlatList } from "react-native";
import { useContext } from "react";
import ProgramCardProgress from "../../../components/ui/cards/ProgramCardProgress";
import { PROGRAMS } from "../../../data/dummy-data";
import { DataContext } from "../../../store/context/data-context";

function sum(arr) {
  let sum = 0;
  arr.forEach((num) => {
    sum += num;
  });
  return sum;
}

function OnGoingWorkoutList() {
  const dataCtx = useContext(DataContext);

  function renderProgramItem({ item }) {
    return (
      dataCtx.STATUS?.programid.includes(item.id) && (
        <ProgramCardProgress
          id={item.id}
          image={item.img}
          title={item.title}
          categories={item.ctgList}
          percentage={
            (sum(item.statusDayList) / item.statusDayList.length) * 100
          }
          key={item.id}
        />
      )
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>List Program yang Dipilih</Text>
        <FlatList
          data={dataCtx.PROGRAMS}
          keyExtractor={(item) => item.id}
          renderItem={renderProgramItem}
        />
      </View>
    </View>
  );
}

export default OnGoingWorkoutList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 90,
  },
  titleStyle: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
  },
});
