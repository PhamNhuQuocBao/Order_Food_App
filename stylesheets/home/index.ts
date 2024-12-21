import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styleHome = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
    flex: 1,
    borderRadius: 5,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userSetting: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primary.background,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  search: {
    padding: 10,
    paddingHorizontal: 16,
    backgroundColor: "#797D8210",
    borderRadius: 10,
    marginVertical: 20,
  },
  popularRestaurant: {
    fontSize: 17,
    fontWeight: "bold",
  },
  viewAll: {
    color: Colors.gray.color,
  },
});
