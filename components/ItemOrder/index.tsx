import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ItemOrder = () => {
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
          gap: 16,
        }}
      >
        <View style={{}}>
          <Text style={{ backgroundColor: "red" }}>The Pizza Place</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: "red",
              borderRadius: 20,
            }}
          ></View>
          <Text>In progress</Text>
        </View>
      </View>
    </View>
  );
};

export default ItemOrder;

const styles = StyleSheet.create({});
