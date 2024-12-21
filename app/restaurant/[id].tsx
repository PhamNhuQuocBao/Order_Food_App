import {
  View,
  Text,
  Alert,
  Image,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getRestaurantById } from "@/services/restaurant";
import { RestaurantResponse } from "@/types/restaurant";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { styleRestaurantDetails } from "@/stylesheets/restaurantDetails";
import { getMenuByRestaurantId } from "@/services/menu";
import { MenuResponse } from "@/types/menu";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MenuItem from "@/components/MenuItem";

const RestaurantDetails = () => {
  const [restaurantDetails, setRestaurantDetails] =
    useState<RestaurantResponse>();
  const [menus, setMenus] = useState<MenuResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const redirectToMenuDetails = useCallback((id: string) => {
    router.push({ pathname: "/menu/[id]", params: { id } });
  }, []);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    const resRestaurant = await getRestaurantById(id as string);
    const resMenu = await getMenuByRestaurantId(id as string);

    if (!resRestaurant || !resMenu) {
      setIsLoading(false);
      return;
    }

    if (resRestaurant?.status >= 400 || resMenu?.status >= 400) {
      setIsLoading(false);
      return;
    }

    if (resRestaurant?.status === 200) {
      setRestaurantDetails(resRestaurant.data);
    }

    if (resMenu?.status === 200) {
      setMenus(resMenu.data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <SafeAreaView>
      {isLoading ? (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        restaurantDetails && (
          <View>
            <View style={styleRestaurantDetails.relativeImage}>
              <View style={styleRestaurantDetails.buttonBack}>
                <Pressable onPress={() => router.back()}>
                  <AntDesign name="back" size={24} color="white" />
                </Pressable>
              </View>
              <Image
                source={{ uri: restaurantDetails.image }}
                style={{ width: "auto", height: 200 }}
              />
            </View>
            <View>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {restaurantDetails.name}
                </Text>
              </View>
            </View>
            <View>
              {menus.length > 0 &&
                menus.map((item) => {
                  return (
                    <TouchableOpacity
                      key={item._id}
                      onPress={() => redirectToMenuDetails(item._id)}
                    >
                      <MenuItem data={item} />
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        )
      )}
    </SafeAreaView>
  );
};

export default RestaurantDetails;
