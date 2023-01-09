import { View, StyleSheet, Text, FlatList } from "react-native";
import { useContext } from "react";
import ProgramCard from "../../../components/ui/cards/ProgramCard";
import { ProgramContext } from "../../../store/context/program-context";
import { DataContext } from "../../../store/context/data-context";

function BookmarkScreen() {
  const programCtx = useContext(ProgramContext);
  const dataCtx = useContext(DataContext);

  function renderProgramItem({ item }) {
    console.log(programCtx.bookmarkList.includes(item.id));
    return (
      programCtx.bookmarkList.includes(item.id) && (
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
        <Text style={styles.titleStyle}>List Program yang Disimpan</Text>
        {programCtx.bookmarkList.length > 0 ? (
          <FlatList
            data={dataCtx.PROGRAMS}
            keyExtractor={(item) => item.id}
            renderItem={renderProgramItem}
          />
        ) : (
          <Text style={styles.feedbackStyle}>Belum ada program tersimpan</Text>
        )}
      </View>
    </View>
  );
}

export default BookmarkScreen;

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
