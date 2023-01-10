import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../../../components/ui/buttons/Button";
import ReadMore from "@fawazahmed/react-native-read-more";
import COLORS from "../../../../constants/colors";
import DayButton from "../../../../components/ui/buttons/DayButton";
import Card from "../../../../components/ui/cards/Card";
import WorkoutScheduleCard from "../../../../components/ui/cards/WorkoutScheduleCard";
import { useIsFocused } from "@react-navigation/native";
import { ProgramContext } from "../../../../store/context/program-context";
import { DataContext } from "../../../../store/context/data-context";

function ProgramDetail({ route }) {
  const programId = route.params.programId;
  const [isActiveIndex, setIsActiveIndex] = useState(0);
  const cardText = `Dapatkan Tambahan Meal Plan untuk\nProgram Olahragamu`;
  const programCtx = useContext(ProgramContext);
  const dataCtx = useContext(DataContext);
  const isFocused = useIsFocused(); // Re-renders component on navigation
  const selectedProgram = dataCtx.PROGRAMS.find(
    (program) => program.id === programId
  );

  function onPressHandler(activeIdx) {
    setIsActiveIndex(activeIdx);
  }

  function addButtonHandler() {
    const programStatus = programCtx.programList?.includes(selectedProgram.id);
    if (programStatus) {
      programCtx.removeProgram(selectedProgram.id);
      selectedProgram.setStatus(false);
    } else {
      programCtx.addProgram(selectedProgram.id);
      selectedProgram.setStatus(true);
    }
  }

  function bookmarkHandler() {
    const bookmarkStatus = programCtx.bookmarkList?.includes(
      selectedProgram.id
    );
    if (bookmarkStatus) {
      programCtx.removeBookmark(selectedProgram.id);
      selectedProgram.setIsBookmarked(false);
    } else {
      programCtx.addBookmark(selectedProgram.id);
      selectedProgram.setIsBookmarked(true);
    }
  }

  useEffect(() => {
    dataCtx.getWorkoutData();
    dataCtx.getWorkoutProgramData();
    dataCtx.getTips();
    dataCtx.getProgramStatus();
    programCtx.updateProgramStatus();
  }, [isFocused]);

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
            source={require("../../../../assets/images/element_card_diet.png")}
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
      <View style={styles.buttonSection}>
        <View style={styles.buttonContainer}>
          <Button
            style={
              programCtx.programList?.includes(selectedProgram.id)
                ? styles.buttonAddedStyle
                : styles.buttonStyle
            }
            text={
              programCtx.programList?.includes(selectedProgram.id)
                ? "Program Sukses Ditambah"
                : "Coba Program"
            }
            showIcon={true}
            iconName={
              programCtx.programList?.includes(selectedProgram.id)
                ? "check-circle"
                : "add"
            }
            onPress={addButtonHandler}
            iconStyle={
              programCtx.programList?.includes(selectedProgram.id) &&
              styles.iconAddedStyle
            }
            textStyle={
              programCtx.programList?.includes(selectedProgram.id) &&
              styles.textAddedStyle
            }
          />
          <Pressable onPress={bookmarkHandler} style={{ marginLeft: "auto" }}>
            <Ionicons
              name={
                programCtx.bookmarkList?.includes(selectedProgram.id)
                  ? "bookmark"
                  : "bookmark-outline"
              }
              size={20}
              style={{ marginBottom: -14 }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default ProgramDetail;

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
    position: "relative",
    height: 30,
    borderRadius: 6,
    marginTop: 16,
    width: "220%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 20,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  buttonContainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  buttonSection: {
    backgroundColor: "white",
    elevation: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonAddedStyle: {
    position: "relative",
    height: 30,
    borderRadius: 6,
    marginTop: 16,
    width: "138%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: "white",
    borderColor: COLORS.success,
    borderWidth: 1,
  },
  iconAddedStyle: {
    color: COLORS.success,
  },
  textAddedStyle: {
    color: COLORS.success,
  },
});
