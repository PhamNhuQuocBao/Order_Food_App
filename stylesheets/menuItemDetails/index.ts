import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styleMenuItemDetails = StyleSheet.create({
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
  sizeList: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 12,
    marginVertical: 12,
  },
  sizeItem: {
    padding: 12,
    borderRadius: 8,
    borderColor: Colors.gray.background,
    borderWidth: 1,
    color: Colors.gray.color,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.gray.background,
    borderRadius: 12,
  },
});
