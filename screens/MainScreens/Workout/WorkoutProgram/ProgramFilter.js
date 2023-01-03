import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import Button from "../../../../components/ui/buttons/Button";
import ButtonNoOutline from "../../../../components/ui/buttons/ButtonNoOutline";
import FilterButton from "../../../../components/ui/buttons/FilterButton";
import { useNavigation } from "@react-navigation/native";
import PROGRAMFILTER from "../../../../constants/program-filters";

function ProgramFilter({ route }) {
  const defaultFilter = {
    loseweight: false,
    gainweight: false,
    agility: false,
    fatburn: false,
    strength: false,
    calist: false,
    gemuk: false,
    normal: false,
    kurus: false,
    injury: false,
    item: false,
    recommend: false,
    sevendays: false,
    fourteendays: false,
    morefourteen: false,
  };

  let initialFilter;
  if (route.params) {
    initialFilter = route.params;
  } else {
    initialFilter = defaultFilter;
  }

  const [filter, setFilter] = useState(initialFilter);
  const navigation = useNavigation();

  function renderFilterItemGoals({ item }) {
    if (
      item.id === "loseweight" ||
      item.id === "gainweight" ||
      item.id === "agility" ||
      item.id === "fatburn" ||
      item.id === "strength" ||
      item.id === "calist"
    ) {
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

  function renderFilterItemIMT({ item }) {
    if (item.id === "gemuk" || item.id === "normal" || item.id === "kurus") {
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

  function renderFilterItemInjury({ item }) {
    if (item.id === "injury") {
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

  function renderFilterItemOthers({ item }) {
    if (item.id === "item" || item.id === "recommend") {
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
    if (
      item.id === "sevendays" ||
      item.id === "fourteendays" ||
      item.id === "morefourteen"
    ) {
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
    navigation.navigate("ProgramList", filter);
  }

  function onResetHandler() {
    setFilter(defaultFilter);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.containerStyle}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>Filter Program</Text>
          <ButtonNoOutline text="Reset Filter" onPress={onResetHandler} />
        </View>
        <View>
          <Text style={styles.descStyle}>Goals</Text>
          <FlatList
            data={PROGRAMFILTER}
            keyExtractor={(filter) => filter.id}
            renderItem={renderFilterItemGoals}
            numColumns={3}
            extraData={filter}
          />
        </View>
        <View>
          <Text style={styles.descStyle}>Status Indeks Massa Tubuh</Text>
          <FlatList
            data={PROGRAMFILTER}
            keyExtractor={(filter) => filter.id}
            renderItem={renderFilterItemIMT}
            numColumns={3}
            extraData={filter}
          />
        </View>
        <View>
          <Text style={styles.descStyle}>Punya Kondisi Medis?</Text>
          <FlatList
            data={PROGRAMFILTER}
            keyExtractor={(filter) => filter.id}
            renderItem={renderFilterItemInjury}
            numColumns={1}
            extraData={filter}
          />
        </View>
        <View>
          <Text style={styles.descStyle}>Lainnya</Text>
          <FlatList
            data={PROGRAMFILTER}
            keyExtractor={(filter) => filter.id}
            renderItem={renderFilterItemOthers}
            numColumns={2}
            extraData={filter}
          />
        </View>
        <View>
          <Text style={styles.descStyle}>Waktu</Text>
          <FlatList
            data={PROGRAMFILTER}
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

export default ProgramFilter;

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
