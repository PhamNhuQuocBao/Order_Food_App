import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

export const styleMenuItem = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 10,
  },
  info: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100%",
    alignItems: "flex-start",
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 12,
    color: Colors.gray.color,
    overflow: "hidden",
  },
});
