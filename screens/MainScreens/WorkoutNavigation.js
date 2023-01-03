import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutDetail from "./Workout/Workout/WorkoutDetail";
import WorkoutList from "./Workout/Workout/WorkoutList";
import ProgramDetail from "./Workout/WorkoutProgram/ProgramDetail";
import ProgramList from "./Workout/WorkoutProgram/ProgramList";
import WorkoutScreen from "./Workout/WorkoutScreen";
import WorkoutFilter from "./Workout/Workout/WorkoutFilter";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const WorkoutStack = createNativeStackNavigator();
function WorkoutNavigation({ navigation, route }) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = [
      "WorkoutList",
      "WorkoutDetail",
      "ProgramList",
      "ProgramDetail",
      "WorkoutFilter",
    ];
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex", height: 55 } });
    }
  }, [navigation, route]);
  return (
    <WorkoutStack.Navigator
      screenOptions={{ headerTransparent: true, headerTitle: "" }}
    >
      <WorkoutStack.Screen
        name="Workout"
        component={WorkoutScreen}
        options={{ headerBackVisible: false }}
      />
      <WorkoutStack.Screen name="WorkoutList" component={WorkoutList} />
      <WorkoutStack.Screen
        name="WorkoutDetail"
        component={WorkoutDetail}
        options={{ headerTintColor: "white" }}
      />
      <WorkoutStack.Screen name="WorkoutFilter" component={WorkoutFilter} />
      <WorkoutStack.Screen name="ProgramList" component={ProgramList} />
      <WorkoutStack.Screen name="ProgramDetail" component={ProgramDetail} />
    </WorkoutStack.Navigator>
  );
}

export default WorkoutNavigation;
