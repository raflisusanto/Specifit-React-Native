import { View, Text, FlatList, StyleSheet } from "react-native";
import Button from "../../../../components/ui/buttons/Button";
import ProgramCard from "../../../../components/ui/cards/ProgramCard";
import COLORS from "../../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import PROGRAMFILTER from "../../../../constants/program-filters";
import { useContext, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { DataContext } from "../../../../store/context/data-context";
import { UserdataContext } from "../../../../store/context/userdata-context";

function ProgramList({ route }) {
  let filtersObj;
  let filters;
  const navigation = useNavigation();
  const dataCtx = useContext(DataContext);
  const userdataCtx = useContext(UserdataContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (userdataCtx.userdata.isFilled) {
      userdataCtx.calculateIMT();
      userdataCtx.calculateCalPerDay();
      userdataCtx.calculateRecommendation();
    }
  }, [isFocused, route]);

  if (route.params) {
    filtersObj = route.params;
    filters = PROGRAMFILTER.filter((filter) => {
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
        <ProgramCard
          id={item.id}
          image={item.img}
          title={item.title}
          time={item.workoutList.length}
          categories={item.ctgList}
          key={item.id}
        />
      );
    } else {
      for (let i = 0; i < item.ctgList.length; i++) {
        if (filters.includes(item.ctgList[i])) {
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
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 20, marginTop: 70, flex: 1 }}>
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
              ? () => navigation.navigate("ProgramFilter", route.params)
              : () => navigation.navigate("ProgramFilter")
          }
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
        <View style={{ flex: 1, marginTop: 10 }}>
          <FlatList
            data={dataCtx.PROGRAMS}
            keyExtractor={(program) => program.id}
            renderItem={renderWorkoutItem}
          />
        </View>
      </View>
    </View>
  );
}

export default ProgramList;

const styles = StyleSheet.create({});
