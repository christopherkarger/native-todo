import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { listItemStyles } from "./styles";

const ListItem = (props: any) => {
  const [edit, setEdit] = useState(false);
  const [enteredItem, setEnteredItem] = useState(props.item.value);
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
      <TextInput
        style={styles.itemTextInput}
        focusable
        keyboardAppearance="dark"
        placeholder="Produkt"
        value={enteredItem}
        onFocus={() => setEdit(true)}
        onSubmitEditing={() => {
          setEdit(false);
          props.updateItem(enteredItem);
        }}
        onBlur={() => {
          if (edit) {
            setEdit(false);
            props.updateItem(enteredItem);
          }
        }}
        onChangeText={setEnteredItem}
      />

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
