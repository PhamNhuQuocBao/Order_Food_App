import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styleRestaurantDetails = StyleSheet.create({
  relativeImage: {
    position: "relative",
  },
  buttonBack: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 8,
  },
});
