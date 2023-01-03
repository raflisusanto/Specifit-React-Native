import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Home/HomeScreen";
import TipsScreen from "./Home/TipsScreen";
import OnGoingWorkout from "./Home/OnGoingWorkout";
import OnGoingWorkoutList from "./Home/OnGoingWorkoutList";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import WorkoutList from "./Workout/Workout/WorkoutList";
import ProgramList from "./Workout/WorkoutProgram/ProgramList";
import WorkoutFilter from "./Workout/Workout/WorkoutFilter";
import ProgramFilter from "./Workout/WorkoutProgram/ProgramFilter";
import TipsList from "./Home/TipsList";
import FormScreen from "./Home/Form/FormScreen";
import FormGender from "./Home/Form/FormGender";
import FormAge from "./Home/Form/FormAge";
import FormHeight from "./Home/Form/FormHeight";
import FormWeight from "./Home/Form/FormWeight";
import FormActivity from "./Home/Form/FormActivity";
import FormMedical from "./Home/Form/FormMedical";

const HomeStack = createNativeStackNavigator();
function HomeNavigation({ navigation, route }) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = [
      "WorkoutList",
      "OnGoingWorkout",
      "Tips",
      "OnGoingWorkoutList",
      "TipsList",
      "FormScreen",
      "FormGender",
      "FormAge",
      "FormHeight",
      "FormWeight",
      "FormActivity",
      "FormMedical",
      "ProgramFilter",
      "WorkoutFilter",
      "ProgramList",
      "WorkoutList",
    ];
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex", height: 55 } });
    }
  }, [navigation, route]);
  return (
    <HomeStack.Navigator
      screenOptions={{ headerTransparent: true, headerTitle: "" }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerBackVisible: false }}
      />
      <HomeStack.Screen name="WorkoutList" component={WorkoutList} />
      <HomeStack.Screen name="ProgramList" component={ProgramList} />
      <HomeStack.Screen name="WorkoutFilter" component={WorkoutFilter} />
      <HomeStack.Screen name="ProgramFilter" component={ProgramFilter} />
      <HomeStack.Screen name="OnGoingWorkout" component={OnGoingWorkout} />
      <HomeStack.Screen name="Tips" component={TipsScreen} />
      <HomeStack.Screen
        name="OnGoingWorkoutList"
        component={OnGoingWorkoutList}
      />
      <HomeStack.Screen name="TipsList" component={TipsList} />
      <HomeStack.Screen name="FormScreen" component={FormScreen} />
      <HomeStack.Screen name="FormGender" component={FormGender} />
      <HomeStack.Screen name="FormAge" component={FormAge} />
      <HomeStack.Screen name="FormHeight" component={FormHeight} />
      <HomeStack.Screen name="FormWeight" component={FormWeight} />
      <HomeStack.Screen name="FormActivity" component={FormActivity} />
      <HomeStack.Screen name="FormMedical" component={FormMedical} />
    </HomeStack.Navigator>
  );
}

export default HomeNavigation;
