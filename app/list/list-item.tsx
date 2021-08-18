import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { listItemStyles } from "./styles";

const ListItem = (props: any) => {
  return (
    <View
      style={
        props.isEven
          ? { ...styles.itemWrapper }
          : { ...styles.itemWrapper, ...styles.even }
      }
    >
      <TouchableOpacity
        onPress={() => props.toggleItem()}
        style={styles.checkButton}
      >
        <Text> {props.item.checked ? "Done" : "Open"}</Text>
      </TouchableOpacity>
      <Text>{props.item.value}</Text>
      <TouchableOpacity
        onPress={() => props.deleteItem()}
        style={styles.deleteButton}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create(listItemStyles);

export default ListItem;
