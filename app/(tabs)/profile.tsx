import {
  View,
  Text,
  Image,
  Pressable,
  Modal,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { getProfile } from "@/services/profile";
import { SETTINGS } from "@/constants/mock";

const Profile = () => {
  const [address, setAddress] = useState("24 Mai Anh Tuan, Da Nang");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarDisplay, setAvatarDisplay] = useState("");
  const [isSettingsDropdownVisible, setSettingsDropdownVisible] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLogout = useCallback(async () => {
    await AsyncStorage.removeItem("user");
    router.navigate("/auth");
  }, []);

  const handleSettingOptionPress = (path: string | undefined) => {
    setSettingsDropdownVisible(false);
    // Handle each option's action here
    if (path === "/editProfile") {
      router.push({
        pathname: `${path}`,
        params: { name, address, phone, avatarDisplay },
      });
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const userString = await AsyncStorage.getItem("user");
      const user = JSON.parse(userString || "{}");
      const userId = user._id;

      const res = await getProfile(userId);

      if (res?.status === 200) {
        setName(res.data.name);
        setAddress(res.data.address);
        setPhone(res.data.phone);
        setAvatarDisplay(res.data.avatar);
        const data = {
          name: res.data.name,
          address: res.data.address,
          phone: res.data.phone,
          avatarDisplay: res.data.avatar,
        };
        await AsyncStorage.setItem("profile", JSON.stringify(data));
      }

      setLoading(false);
    };
    fetchProfile();
  }, []);

  return (
    <SafeAreaView style={{ position: "relative" }}>
      <ScrollView>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <ActivityIndicator size="large" color={Colors.primary.color} />
          </View>
        ) : (
          <>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: 24,
                marginVertical: 12,
              }}
            >
              Profile
            </Text>
            <View style={{ alignItems: "center" }}>
              <Image
                source={{
                  uri: avatarDisplay
                    ? avatarDisplay
                    : "https://www.ruaanhgiare.vn/wp-content/uploads/2023/06/anh-ngau.jpg",
                }}
                width={120}
                height={120}
                style={{ borderRadius: 60 }}
              />
            </View>
            <View style={{ gap: 4, marginTop: 12 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                {name}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: Colors.gray.color,
                }}
              >
                {address}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: Colors.gray.color,
                }}
              >
                {phone}
              </Text>
            </View>
            <View style={{ gap: 20, margin: 20 }}>
              <View style={{ flexDirection: "row", gap: 20 }}>
                <View
                  style={{
                    backgroundColor: Colors.gray.disable,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 50,
                  }}
                >
                  <MaterialIcons name="payment" size={24} color="black" />
                </View>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    Payment methods
                  </Text>
                  <Text style={{ color: Colors.gray.color }}>
                    2 cards added
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 20 }}>
                <View
                  style={{
                    backgroundColor: Colors.gray.disable,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 50,
                  }}
                >
                  <AntDesign name="home" size={24} color="black" />
                </View>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    Delivery address
                  </Text>
                  <Text style={{ color: Colors.gray.color }}>{address}</Text>
                </View>
              </View>
              <Pressable
                style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
                onPress={() => setSettingsDropdownVisible((prev) => !prev)}
              >
                <View
                  style={{
                    backgroundColor: Colors.gray.disable,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 50,
                  }}
                >
                  <AntDesign name="setting" size={24} color="black" />
                </View>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    Settings
                  </Text>
                </View>
              </Pressable>
              {isSettingsDropdownVisible && (
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    marginHorizontal: 10,
                    borderRadius: 10,
                    elevation: 2,
                  }}
                >
                  {SETTINGS.map(({ title, path }, index, array) => (
                    <Pressable
                      key={index}
                      onPress={() => handleSettingOptionPress(path)}
                      style={{
                        padding: 10,
                        borderBottomWidth: index !== array.length - 1 ? 1 : 0,
                        borderBottomColor: "#ccc",
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>{title}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            {/* Button Logout */}
            <Pressable
              style={{
                padding: 12,
                backgroundColor: Colors.gray.disable,
                borderRadius: 50,
                position: "absolute",
                top: 40,
                right: 20,
              }}
              onPress={onLogout}
            >
              <AntDesign name="logout" size={16} color="black" />
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
