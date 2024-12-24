import {
  View,
  Text,
  ScrollViewBase,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemOrder from "@/components/ItemOrder";

const Order = () => {
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
          {[1, 2, 3].map((item, index) => (
            <ItemOrder />
          ))}
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
