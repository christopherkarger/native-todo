import { Dimensions, StyleSheet } from "react-native";
import { isAndroid } from "../helpers/platform";

export const listStyles: StyleSheet.NamedStyles<any> = {
  viewWrapper: {
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    fontFamily: "roboto-black",
    fontSize: 45,
    marginTop: isAndroid ? 40 : 10,
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
    marginBottom: 20,
  },
  addButtonText: {
    color: "#ffffff",
    fontFamily: "roboto-regular",
    fontSize: 18,
  },
};

export const listItemStyles: StyleSheet.NamedStyles<any> = {
  itemWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  checkButton: {
    marginRight: 10,
  },
  deleteButton: {
    marginLeft: "auto",
  },
  even: {
    backgroundColor: "#cae6fa",
  },
};
