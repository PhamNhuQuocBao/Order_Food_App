import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  ScrollViewBase,
  Text,
  View,
} from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMenuById } from "@/services/menu";
import { MenuResponse } from "@/types/menu";
import { styleMenuItemDetails } from "@/stylesheets/menuItemDetails";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import { addToCart } from "@/services/cart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserResponse } from "@/types/user";
import { itemCart } from "@/types/cart";
import { IMG_DEFAULT } from "@/constants/mock";

const MenuItemDetails = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [menu, setMenu] = useState<MenuResponse>();
  const [sizeSelected, setSizeSelected] = useState<string>("");
  const [amountItem, setAmountItem] = useState<number>(1);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const onAmountIncrease = useCallback(() => {
    setAmountItem((pre) => pre + 1);
  }, []);

  const onAmountDeincrease = useCallback(() => {
    setAmountItem((pre) => {
      if (pre > 1) {
        return pre - 1;
      }

      return 1;
    });
  }, []);

  const onAddToBag = async () => {
    if (!menu) return;

    const itemCart: itemCart = {
      menuItem: menu,
      quantity: amountItem,
      totalPrice: menu?.price * amountItem,
    };

    if (sizeSelected) {
      itemCart.size = sizeSelected;
    }

    const user = await AsyncStorage.getItem("user");
    if (!user) {
      Alert.alert("Warning", "Please login in order to get item");
      return;
    }
    const userId = JSON.parse(user)._id;
    console.log(userId);

    const res = await addToCart(itemCart, userId);

    if (res?.status === 200) {
      router.navigate("/(tabs)/bag");
      return;
    }

    if (res?.status === 400) {
      Alert.alert("Error", "Something went wrong, please try again!");
      return;
    }
  };

  const fetch = useCallback(async () => {
    setIsLoading(true);
    const res = await getMenuById(id as string);

    if (!res) {
      setIsLoading(false);
      return;
    }

    if (res.status >= 400) {
      setIsLoading(false);
      Alert.alert("Error", "Try again!");
      return;
    }

    if (res.status === 200) {
      setMenu(res.data);
    }

    setIsLoading(false);
  }, []);

  useLayoutEffect(() => {
    fetch();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading ? (
          <View
            style={{
              display: "flex",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <View>
            <View style={styleMenuItemDetails.relativeImage}>
              <View style={styleMenuItemDetails.buttonBack}>
                <Pressable onPress={() => router.back()}>
                  <AntDesign name="back" size={24} color="white" />
                </Pressable>
              </View>
              <Image
                source={{
                  uri: menu?.image ? menu.image : IMG_DEFAULT,
                }}
                style={{ width: "auto", height: 200 }}
              />
            </View>
            <View style={{ padding: 20 }}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {menu?.name}
                </Text>
                <Text style={{ color: Colors.gray.color }}>
                  {menu?.description}
                </Text>
              </View>
              <View style={styleMenuItemDetails.sizeList}>
                {menu?.size.map((item, index) => (
                  <Text
                    key={index}
                    style={{
                      ...styleMenuItemDetails.sizeItem,
                      backgroundColor: `${
                        sizeSelected === item
                          ? Colors.primary.background
                          : "transparent"
                      }`,
                    }}
                    onPress={() => setSizeSelected(item)}
                  >
                    {item}
                  </Text>
                ))}
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: Colors.primary.color,
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  ${menu && menu.price * amountItem}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <Pressable
                    style={{
                      ...styleMenuItemDetails.button,
                      paddingHorizontal: 18,
                    }}
                    onPress={onAmountDeincrease}
                  >
                    <Text>-</Text>
                  </Pressable>
                  <Text>{amountItem}</Text>
                  <Pressable
                    style={styleMenuItemDetails.button}
                    onPress={onAmountIncrease}
                  >
                    <Text>+</Text>
                  </Pressable>
                </View>
              </View>
              <View style={{ marginTop: 50 }}>
                <Button title="Add to bag" onPress={onAddToBag} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuItemDetails;
