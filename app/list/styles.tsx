import { Dimensions, StyleSheet } from "react-native";
import { isAndroid } from "../helpers/platform";

export const listStyles: StyleSheet.NamedStyles<any> = {
  safeArea: {
    flex: 1,
  },
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
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  checkButton: {
    padding: 12,
  },
  deleteButton: {
    marginLeft: "auto",
    padding: 12,
  },
  even: {
    backgroundColor: "#cae6fa",
  },
  itemTextInput: {
    flex: 1,
    paddingLeft: 10,
    height: "100%",
  },
  itemText: {
    flex: 1,
    paddingLeft: 10,
    height: 200,
  },
};
