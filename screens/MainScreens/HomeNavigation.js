import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Home/HomeScreen";
import TipsScreen from "./Home/TipsScreen"
import OnGoingWorkout from "./Home/OnGoingWorkout";
import OnGoingWorkoutList from "./Home/OnGoingWorkoutList";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import WorkoutList from "./Workout/Workout/WorkoutList";
import TipsList from "./Home/TipsList";

const HomeStack = createNativeStackNavigator();
function HomeNavigation({ navigation, route }) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = ["WorkoutList", "OnGoingWorkout", "Tips", "OnGoingWorkoutList", "TipsList"];
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex", height: 55 } });
    }
  }, [navigation, route]);
  return (
    <HomeStack.Navigator screenOptions={{headerTransparent: true, headerTitle: '' }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerBackVisible: false }}
      />
      <HomeStack.Screen name="WorkoutList" component={WorkoutList} />
      <HomeStack.Screen name="OnGoingWorkout" component={OnGoingWorkout} />
      <HomeStack.Screen name="Tips" component={TipsScreen} />
      <HomeStack.Screen name="OnGoingWorkoutList" component={OnGoingWorkoutList} />
      <HomeStack.Screen name="TipsList" component={TipsList} />
    </HomeStack.Navigator>
  );
}

export default HomeNavigation;
