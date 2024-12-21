import { StyleSheet } from "react-native";

export const styleSplash = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Fredoka",
    padding: 20,
  },
  view: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  image: {},
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    color: "#797D82",
  },
});
