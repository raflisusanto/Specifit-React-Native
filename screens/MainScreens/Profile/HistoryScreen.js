import { View, StyleSheet, Text, FlatList } from "react-native";
import { useContext } from "react";
import ProgramCard from "../../../components/ui/cards/ProgramCard";
import { ProgramContext } from "../../../store/context/program-context";
import { PROGRAMS } from "../../../data/dummy-data";

function sum(arr) {
  let sum = 0;
  arr.forEach((num) => {
    sum += num;
  });
  return sum;
}

function HistoryScreen() {
  const programCtx = useContext(ProgramContext);

  function checkDoneProgram() {
    const listDone = PROGRAMS.filter((program) => {
      if (programCtx.programList.includes(program.id) && sum(program.statusDayList) / program.ctgList.length * 100 === 100) {
        return program;
      }
    })

    if (listDone.length > 0) {
      return true;
    }
    return false;
  }

  function renderProgramItem({ item }) {
    return (
      programCtx.programList.includes(item.id) &&
      (sum(item.statusDayList) / item.ctgList.length) * 100 === 100 && (
        <ProgramCard
          id={item.id}
          image={item.img}
          title={item.title}
          categories={item.ctgList}
          time={item.workoutList.length}
        />
      )
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>List Program yang Sudah Selesai</Text>
        {checkDoneProgram() ? (
          <FlatList
            data={PROGRAMS}
            keyExtractor={(item) => item.id}
            renderItem={renderProgramItem}
          />
        ) : (
          <Text style={styles.feedbackStyle}>Belum ada program selesai</Text>
        )}
      </View>
    </View>
  );
}

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 90,
  },
  titleStyle: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
    marginBottom: 10,
  },
  feedbackStyle: {
    fontSize: 16,
    fontFamily: "OpenSans_400Regular",
    marginTop: 10,
  },
});
