import ButtonNoOutline from "../../../../components/ui/buttons/ButtonNoOutline";
import { PROGRAMS } from "../../../../data/dummy-data";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../../../components/ui/buttons/Button";

function ProgramDetail({ route }) {
  const programId = route.params.programId;
  const selectedProgram = PROGRAMS.find((program) => program.id === programId);

  return (
    <>
      <ScrollView style={{ flex: 1, marginTop: 80, marginHorizontal: 20 }}>
        <View>
          <Text>{selectedProgram.title}</Text>
          <Image></Image>
          <View>
            <Text></Text>
            <Text></Text>
            <ButtonNoOutline />
          </View>
          <View>
            <ScrollView horizontal={true}>
              <View></View>
              <View></View>
              <View></View>
            </ScrollView>
            <Text></Text>
            <View>
              <View></View>
              <View></View>
            </View>
            <View>
              <Image></Image>
              <Text></Text>
              <Button />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{marginHorizontal: 20}}>
        <Button />
        <Ionicons />
      </View>
    </>
  );
}

export default ProgramDetail;
