import { View, Text, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styleBag } from "@/stylesheets/bag";
import StackBag from "@/components/StackBag";
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCart, updateItemCart } from "@/services/cart";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

const DELIVERY_COST = 10;

const Bag = () => {
  const [menus, setMenus] = useState<{ userId: string; products: any[] }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subTotal, setSubTotal] = useState<number>(0);
  const isFocused = useIsFocused();
  const router = useRouter();

  const calculateTotalPrice = useCallback((cart: any) => {
    return cart.products.reduce(
      (total: number, product: any) => total + product.totalPrice,
      0
    );
  }, []);

  const updateQuantity = async (
    menuItemId: string,
    type: "increment" | "decrement"
  ) => {
    if (!menus) return;

    const updatedProducts = menus.products
      .map((product) => {
        if (product.menuItem._id === menuItemId) {
          const updatedQuantity =
            type === "increment"
              ? product.quantity + 1
              : Math.max(product.quantity - 1, 0);
          return {
            ...product,
            quantity: updatedQuantity,
            totalPrice: updatedQuantity * product.menuItem.price, // Assuming `price` is a property of `menuItem`
          };
        }
        return product;
      })
      .filter((product) => product.quantity > 0); // Remove items with 0 quantity

    const updatedMenus = { ...menus, products: updatedProducts };
    await AsyncStorage.setItem("cart", JSON.stringify(updatedMenus));
    setMenus(updatedMenus);
    setSubTotal(calculateTotalPrice(updatedMenus));
    updateCart(updatedMenus);
  };

  const updateCart = async (updatedMenus: any) => {
    const userStr = await AsyncStorage.getItem("user");
    const user = JSON.parse(userStr || "{}");
    await updateItemCart(user._id, updatedMenus);
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem("user");
      if (!userData) {
        setIsLoading(false);
        return;
      }

      const res = await getCart(JSON.parse(userData)._id);
      const { status, data } = res || {};
      console.log("STATUS: ", status);
      console.log("DATA: ", data);

      if (status === 200) {
        console.log("SETTTTTTTTTTTTT");

        setMenus(data);
        setIsLoading(false);
        setSubTotal(calculateTotalPrice(data));
        await AsyncStorage.setItem("cart", JSON.stringify(menus));
        return;
      }

      if (res?.status === 400) {
        Alert.alert("Error", "Something went wrong!");
        setIsLoading(false);
        return;
      }
    };
    if (isFocused) {
      fetch();
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <SafeAreaView style={styleBag.container}>
          <Text style={styleBag.headerTitle}>My bag</Text>
          {menus && menus.products.length > 0 && (
            <ScrollView>
              <View>
                {menus.products.map((item: any) => (
                  <View key={item.menuItem._id}>
                    <StackBag
                      onDecrement={() =>
                        updateQuantity(item.menuItem._id, "decrement")
                      }
                      onIncrement={() => {
                        updateQuantity(item.menuItem._id, "increment");
                      }}
                      data={item.menuItem}
                      quantity={item.quantity}
                      totalPrice={item.totalPrice}
                      key={item.menuItem._id}
                    />
                    <Text style={{ color: Colors.primary.color }}>
                      --------------------------------------------------------
                    </Text>
                  </View>
                ))}
              </View>
              <View
                style={{
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Subtotal</Text>
                  <Text
                    style={{ fontWeight: "bold", color: Colors.primary.color }}
                  >
                    {subTotal}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Delivery</Text>
                  <Text
                    style={{ fontWeight: "bold", color: Colors.primary.color }}
                  >
                    5
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Total</Text>
                  <Text
                    style={{ fontWeight: "bold", color: Colors.primary.color }}
                  >
                    {subTotal + 5}
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}

          <Button
            title="Checkout"
            disabled={subTotal === 0}
            onPress={() => {
              if (subTotal > 0) {
                router.push({
                  pathname: "/checkout",
                  params: {
                    amount: subTotal + 5,
                  },
                });
              }
            }}
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default Bag;
