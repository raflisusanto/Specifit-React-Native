import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import HomeNavigation from "./HomeNavigation";
import COLORS from "../../constants/colors";
import ProfileNavigation from "./ProfileNavigation";
import WorkoutNavigation from "./WorkoutNavigation";

function MainScreen() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          color = focused ? COLORS.primary : "#C8C8C8";
          size = 24;
          if (route.name === "HomeStack") {
            iconName = "home";
          } else if (route.name === "WorkoutStack") {
            iconName = "weight-lifter";
          } else if (route.name === "ProfileStack") {
            return <Ionicons name="person" size={size} color={color} />;
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: "#C8C8C8",
        tabBarIconStyle: { marginTop: 5 },
        tabBarLabelStyle: {
          fontFamily: "OpenSans_600SemiBold",
          fontSize: 12,
          marginBottom: 8,
        },
        tabBarStyle: { height: 55 },
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeNavigation} options={{headerShown: false, tabBarLabel:"Home"}} />
      <Tab.Screen name="WorkoutStack" component={WorkoutNavigation} options={{headerShown: false, tabBarLabel:"Workout"}} />
      <Tab.Screen name="ProfileStack" component={ProfileNavigation} options={{headerShown: false, tabBarLabel:"Profile"}}/>
    </Tab.Navigator>
  );
}

export default MainScreen;
