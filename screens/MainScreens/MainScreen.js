import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import WorkoutScreen from "./WorkoutScreen";
import HomeScreen from "./HomeScreen";
import COLORS from "../../constants/colors";
import ProfileNavigation from "./ProfileNavigation";

function MainScreen() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          color = focused ? COLORS.primary : "#C8C8C8";
          size = 24;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Workout") {
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
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Tab.Screen name="Workout" component={WorkoutScreen} options={{headerShown: false}} />
      <Tab.Screen name="ProfileStack" component={ProfileNavigation} options={{headerShown: false, tabBarLabel:"Profile"}}/>
    </Tab.Navigator>
  );
}

export default MainScreen;
