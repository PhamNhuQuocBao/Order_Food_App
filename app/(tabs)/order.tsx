import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemOrder from "@/components/ItemOrder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getOrders } from "@/services/order";
import { OrderResponse } from "@/types/order";

const Order = () => {
  const [orders, setOrders] = React.useState<OrderResponse[]>([]);
  const fetch = useCallback(async () => {
    try {
      const userStr = await AsyncStorage.getItem("user");
      const user = JSON.parse(userStr || "{}");
      const res = await getOrders(user._id);

      if (res?.status === 200) {
        setOrders(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <SafeAreaView>
      <ScrollView style={{ padding: 16 }}>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            My Order
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          {orders.length > 0 &&
            orders.map((item, index) => <ItemOrder key={index} data={item} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
