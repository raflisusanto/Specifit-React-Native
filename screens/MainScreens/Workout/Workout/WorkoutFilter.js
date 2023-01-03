import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import Button from "../../../../components/ui/buttons/Button";
import ButtonNoOutline from "../../../../components/ui/buttons/ButtonNoOutline";
import WORKOUTFILTER from "../../../../constants/filters";
import FilterButton from "../../../../components/ui/buttons/FilterButton";
import { useNavigation } from "@react-navigation/native";

function WorkoutFilter({ route }) {
  const defaultFilter = {
    abs: false,
    arms: false,
    legs: false,
    fatburn: false,
    chest: false,
    shoulder: false,
    lessten: false,
    moreten: false,
  };

  let initialFilter;
  if (route.params) {
    initialFilter = route.params;
  } else {
    initialFilter = defaultFilter;
  }

  const [filter, setFilter] = useState(initialFilter);
  const navigation = useNavigation();

  function renderFilterItemCtg({ item }) {
    if (item.id !== "lessten" && item.id !== "moreten") {
      const initActive = filter[item.id];
      return (
        <FilterButton
          title={item.title}
          id={item.id}
          setFilter={setFilter}
          initActive={initActive}
        />
      );
    }
  }

  function renderFilterItemTime({ item }) {
    if (item.id === "lessten" || item.id === "moreten") {
      const initActive = filter[item.id];
      return (
        <FilterButton
          title={item.title}
          id={item.id}
          setFilter={setFilter}
          initActive={initActive}
        />
      );
    }
  }

  function onSubmitFilter() {
    navigation.navigate("WorkoutList", filter);
  }

  function onResetHandler() {
    setFilter(defaultFilter);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.containerStyle}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>Filter Olahraga</Text>
          <ButtonNoOutline text="Reset Filter" onPress={onResetHandler} />
        </View>
        <View>
          <Text style={styles.descStyle}>Kategori</Text>
          <FlatList
            data={WORKOUTFILTER}
            keyExtractor={(filter) => filter.id}
            renderItem={renderFilterItemCtg}
            numColumns={3}
            extraData={filter}
          />
        </View>
        <View>
          <Text style={styles.descStyle}>Waktu</Text>
          <FlatList
            data={WORKOUTFILTER}
            keyExtractor={(filter) => filter.id}
            renderItem={renderFilterItemTime}
            numColumns={3}
            extraData={filter}
          />
        </View>
        <Button
          text="Simpan Filter"
          onPress={onSubmitFilter}
          style={{ marginTop: 30 }}
        />
      </View>
    </View>
  );
}

export default WorkoutFilter;

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 90,
    marginHorizontal: 20,
  },
  titleStyle: {
    fontSize: 20,
    fontFamily: "OpenSans_700Bold",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  descStyle: {
    fontSize: 14,
    fontFamily: "OpenSans_600SemiBold",
    marginTop: 10,
    marginVertical: 4,
  },
});
