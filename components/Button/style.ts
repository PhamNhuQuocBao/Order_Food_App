import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styleButton = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.background,
    padding: 16,
    marginTop: "auto",
    width: "100%",
    borderRadius: 8,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
