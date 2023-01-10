import { useContext } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import TipsCard from "../../../components/ui/cards/TipsCard";
import { DataContext } from "../../../store/context/data-context";

function TipsList() {
  const dataCtx = useContext(DataContext);
  function renderTipsItem({ item }) {
    return (
      <TipsCard
        id={item.id}
        image={item.img}
        title={item.title}
        containerStyle={{ width: "100%", marginVertical: 10 }}
      />
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Tips untuk Kamu</Text>
        <FlatList
          data={dataCtx.TIPS}
          keyExtractor={(item) => item.id}
          renderItem={renderTipsItem}
        />
      </View>
    </View>
  );
}

export default TipsList;

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
