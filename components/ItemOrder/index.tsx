import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { OrderResponse } from "@/types/order";
import { Colors } from "@/constants/Colors";

interface Props {
  data: OrderResponse;
}

const ItemOrder: FC<Props> = ({ data }) => {
  const { name, _id, status, products } = data;
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 10,
        borderStyle: "dashed",
        padding: 16,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 2,
          borderStyle: "dashed",
          borderColor: Colors.primary.background,
          paddingBottom: 8,
          gap: 16,
        }}
      >
        <View style={{}}>
          <Text style={{}}>{_id?.slice(0, 20).toUpperCase()}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: `${
                status === "In Progress" ? "orange" : "green"
              }`,
              borderRadius: 10,
            }}
          ></View>
          <Text>{status}</Text>
        </View>
      </View>
      <View
        style={{
          paddingVertical: 8,
          display: "flex",
          flexDirection: "column",
          borderBottomWidth: 2,
          borderStyle: "dashed",
          borderColor: Colors.primary.background,
        }}
      >
        {products.map((product, index) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            key={index}
          >
            <Text key={index}>
              {product.menuItem.name} {`(${product.menuItem.price}$/1)`}
            </Text>
            <Text>x{product.quantity}</Text>
          </View>
        ))}
      </View>
      <View style={{ paddingTop: 8 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>Total amount</Text>
          <Text>Quantity</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>${data.amount}</Text>
          <Text style={{ fontWeight: "bold" }}>
            {data.products.reduce((sum, product) => sum + product.quantity, 0)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ItemOrder;

const styles = StyleSheet.create({});
