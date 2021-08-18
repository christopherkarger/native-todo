import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
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
        {!props.item.checked && (
          <Feather name="circle" size={24} color="black" />
        )}
        {props.item.checked && (
          <AntDesign name="checkcircle" size={24} color="black" />
        )}
      </TouchableOpacity>
      <Text>{props.item.value}</Text>
      <TouchableOpacity
        onPress={() => props.deleteItem()}
        style={styles.deleteButton}
      >
        <MaterialIcons name="delete" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create(listItemStyles);

export default ListItem;
