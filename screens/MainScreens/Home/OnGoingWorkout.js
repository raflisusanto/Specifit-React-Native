import { PROGRAMS } from "../../../data/dummy-data";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import Button from "../../../components/ui/buttons/Button";
import ReadMore from "@fawazahmed/react-native-read-more";
import COLORS from "../../../constants/colors";
import DayButton from "../../../components/ui/buttons/DayButton";
import Card from "../../../components/ui/cards/Card";
import WorkoutScheduleCard from "../../../components/ui/cards/WorkoutScheduleCard";

function OnGoingWorkout({ route }) {
  const programId = route.params.programId;
  const selectedProgram = PROGRAMS.find((program) => program.id === programId);
  const [isActiveIndex, setIsActiveIndex] = useState(0);
  const initialStatusDay = selectedProgram.statusDayList;
  const [statusDayList, setStatusDayList] = useState(initialStatusDay);
  const cardText = `Dapatkan Tambahan Meal Plan untuk\nProgram Olahragamu`;

  function onDoneHandler() {
    setStatusDayList((currentStatusList) => {
      let currentList = [...currentStatusList];
      let item = { ...currentList[isActiveIndex] };
      if (currentStatusList[isActiveIndex] === 1) {
        item = 0;
        selectedProgram.statusDayList[isActiveIndex] = 0;
      } else {
        item = 1;
        selectedProgram.statusDayList[isActiveIndex] = 1;
      }
      currentList[isActiveIndex] = item;
      return currentList;
    });
  }

  function onPressHandler(activeIdx) {
    setIsActiveIndex(activeIdx);
  }

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <ScrollView>
        <Text style={styles.titleStyle}>{selectedProgram.title}</Text>
        <Image
          source={{
            uri: selectedProgram.img,
          }}
          style={styles.imgStyle}
        ></Image>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionMargins}>
            <Text style={styles.descTitle}>Deskripsi Program</Text>
            <ReadMore
              numberOfLines={3}
              style={styles.descStyle}
              seeMoreStyle={styles.seeMoreStyle}
              seeLessStyle={styles.seeMoreStyle}
            >
              {selectedProgram.desc}
            </ReadMore>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionMargins}>
            <ScrollView horizontal={true}>
              {selectedProgram.workoutList.map((workout, index) => {
                return (
                  <DayButton
                    day={index + 1}
                    key={index}
                    isActiveIndex={isActiveIndex}
                    onPress={onPressHandler}
                    isDone={statusDayList[index] === 1}
                  />
                );
              })}
            </ScrollView>
            <Text style={[styles.descTitle, { marginTop: 20 }]}>Olahraga</Text>
            <View>
              {selectedProgram.workoutList[isActiveIndex].map((workout) => {
                return (
                  <WorkoutScheduleCard
                    id={workout.id}
                    title={workout.title}
                    est={workout.totalEst}
                    key={workout.id}
                  />
                );
              })}
              <Button
                style={
                  statusDayList[isActiveIndex] === 0
                    ? styles.buttonStyle
                    : styles.buttonStyleDone
                }
                text={statusDayList[isActiveIndex] === 0 ? "Selesai Hari Ini" : "Undo Selesai"}
                textStyle={statusDayList[isActiveIndex] === 1 && styles.textStyleDone}
                onPress={onDoneHandler}
              />
            </View>
          </View>
        </View>
        <Card
          style={{
            marginVertical: 20,
            marginHorizontal: 20,
            backgroundColor: COLORS.primary,
            overflow: "hidden",
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../../../assets/images/element_card_diet.png")}
            style={styles.cardImagesRight}
          ></Image>
          <Text
            style={{
              fontFamily: "OpenSans_600SemiBold",
              fontSize: 14,
              marginTop: 10,
              color: "white",
            }}
          >
            {cardText}
          </Text>
          <Button
            text="Klik disini"
            textStyle={{ color: "black" }}
            style={{
              width: "35%",
              height: 25,
              borderRadius: 20,
              marginVertical: 15,
              backgroundColor: "white",
            }}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

export default OnGoingWorkout;

const styles = StyleSheet.create({
  titleStyle: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 24,
    marginHorizontal: 20,
  },
  descTitle: {
    fontFamily: "OpenSans_700Bold",
    fontSize: 20,
  },
  descStyle: {
    fontFamily: "OpenSans_400Regular",
    fontSize: 18,
    marginTop: 10,
  },
  sectionContainer: {
    backgroundColor: "white",
    marginTop: 10,
  },
  sectionMargins: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  imgStyle: {
    width: 400,
    height: 220,
    marginTop: 10,
  },
  seeMoreStyle: {
    color: COLORS.primary,
    fontFamily: "OpenSans_400Regular",
    fontSize: 18,
  },
  cardImagesRight: {
    resizeMode: "contain",
    alignSelf: "flex-end",
    bottom: -80,
    right: -30,
    position: "absolute",
  },
  buttonStyle: {
    height: 30,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  buttonStyleDone: {
    height: 30,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.success,
    backgroundColor: "white",
  },
  textStyleDone: {
    color: COLORS.success,
  },
});
