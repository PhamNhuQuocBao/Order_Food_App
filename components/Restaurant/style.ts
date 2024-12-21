import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styleRestaurant = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
    marginBottom: 24,
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 15,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
