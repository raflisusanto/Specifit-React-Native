import Button from "../../../components/ui/buttons/Button";
import { View, Image, StyleSheet, Text } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../../store/context/auth-context";
import COLORS from "../../../constants/colors";

function ProfileScreen({ navigation }) {
  const userAuthCtx = useContext(AuthContext);
  return (
    <>
      <Image
        source={require("../../../assets/images/element_profile.png")}
        style={styles.staticImage}
      ></Image>
      <View style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 20, marginVertical: 40, flex: 1 }}>
          <Text
            style={{
              fontFamily: "OpenSans_700Bold",
              fontSize: 24,
              color: "white",
            }}
          >
            Profil
          </Text>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Image
                source={require("../../../assets/images/patrick.jpg")}
                style={{
                  borderRadius: 100,
                  resizeMode: "cover",
                  width: 80,
                  height: 80,
                  marginRight: 20,
                  borderWidth: 1,
                  borderColor: "white",
                }}
              ></Image>
              <Text
                style={{
                  fontFamily: "OpenSans_700Bold",
                  fontSize: 16,
                  marginVertical: 40,
                  color: "white",
                }}
              >
                Rita Sukaesih
              </Text>
            </View>
          </View>
          <View>
            <Button
              text="Edit Profile"
              style={styles.profileButtonStyle}
              textStyle={styles.profileTextButtonStyle}
              showIcon={true}
              iconName="person"
              iconStyle={{
                backgroundColor: COLORS.primary,
                borderRadius: 100,
                padding: 4,
              }}
              onPress={() => navigation.navigate("EditProfile")}
            ></Button>
            <Button
              text="Program Tersimpan"
              style={styles.profileButtonStyle}
              textStyle={styles.profileTextButtonStyle}
              showIcon={true}
              iconName="bookmark"
              iconStyle={{
                backgroundColor: COLORS.primary,
                borderRadius: 100,
                padding: 4,
              }}
              onPress={() => navigation.navigate("Bookmarks")}
            ></Button>
            <Button
              text="History Program"
              style={styles.profileButtonStyle}
              textStyle={styles.profileTextButtonStyle}
              showIcon={true}
              iconName="history"
              iconStyle={{
                backgroundColor: COLORS.primary,
                borderRadius: 100,
                padding: 4,
              }}
              onPress={() => navigation.navigate("History")}
            ></Button>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{ flex: 1, flexDirection: "column", marginTop: "auto" }}
            >
              <Button
                text="Logout"
                onPress={userAuthCtx.logoutHandler}
                showIcon={true}
                iconName="logout"
                style={{
                  flexDirection: "row",
                  backgroundColor: COLORS.danger,
                  height: 45,
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 4,
                  marginBottom: 16,
                  fontSize: 12,
                }}
              >
                Specifit v.0.1
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  staticImage: {
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: -5,
    position: "absolute",
  },
  profileButtonStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderRadius: 9,
    marginBottom: 10,
    paddingLeft: 16,
    elevation: 2,
    height: 50,
  },
  profileTextButtonStyle: {
    color: "black",
    fontFamily: "OpenSans_400Regular",
  },
});
