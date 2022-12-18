import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookmarkScreen from "./Profile/BookmarkScreen";
import EditProfileScreen from "./Profile/EditProfileScreen";
import HistoryScreen from "./Profile/HistoryScreen";
import ProfileScreen from "./Profile/ProfileScreen";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const ProfileStack = createNativeStackNavigator();
function ProfileNavigation({ navigation, route }) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = ["EditProfile", "Bookmarks", "History"];
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex", height: 55 } });
    }
  }, [navigation, route]);
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerBackVisible: true,
        headerTransparent: true,
        headerTitle: "",
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerTitle: "Edit Profile" }}
      />
      <ProfileStack.Screen
        name="Bookmarks"
        component={BookmarkScreen}
        options={{ headerTitle: "Program Tersimpan" }}
      />
      <ProfileStack.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerTitle: "History Program" }}
      />
    </ProfileStack.Navigator>
  );
}

export default ProfileNavigation;
