import { Dimensions, StyleSheet } from "react-native";

export const listStyles: StyleSheet.NamedStyles<any> = {
  viewWrapper: {
    marginLeft: 20,
  },
  header: {
    fontFamily: "roboto-black",
    fontSize: 45,
    marginTop: 10,
    marginBottom: 30,
  },
  textInput: {
    borderColor: "black",
    borderWidth: 2,
    width: Dimensions.get("window").width - 44,
    padding: 15,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#0095ff",
    paddingHorizontal: 25,
    paddingVertical: 12,
    alignSelf: "flex-start",
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontFamily: "roboto-regular",
    fontSize: 18,
  },
};
