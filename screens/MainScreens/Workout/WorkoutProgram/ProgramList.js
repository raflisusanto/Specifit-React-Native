import { Ionicons } from "@expo/vector-icons";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Button from "../../../../components/ui/buttons/Button";
import ProgramCard from "../../../../components/ui/cards/ProgramCard";
import { PROGRAMS } from "../../../../data/dummy-data";
import COLORS from "../../../../constants/colors";

function ProgramList() {
  function renderWorkoutItem({ item }) {
    return (
      <ProgramCard
        id={item.id}
        image={item.img}
        title={item.title}
        time={item.workoutList.length}
        categories={item.ctgList}
        key={item.id}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 4,
            padding: 10,
            marginTop: 80,
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
          Program Olahraga {">"} 7 hari
        </Text>
        <FlatList
          data={PROGRAMS}
          keyExtractor={(program) => program.id}
          renderItem={renderWorkoutItem}
        />
      </View>
    </View>
  );
}

export default ProgramList;

const styles = StyleSheet.create({});
