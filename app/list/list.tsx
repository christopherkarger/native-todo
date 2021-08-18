import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "../../firebase";
import { listStyles } from "./styles";

interface IListItem {
  checked: boolean;
  value: string;
}

const List = () => {
  const [enteredItem, setEnteredItem] = useState("");
  const [allItems, setAllItems] = useState<IListItem[]>([]);
  const firebaseList = firebase.database().ref("/");

  const saveToList = (list?: IListItem[]) => {
    if (list) {
      setAllItems(list);
      return;
    }

    if (enteredItem) {
      const item = {
        checked: false,
        value: enteredItem,
      };

      setAllItems((all) => {
        const updatedList = all.length > 0 ? [...all, item] : [item];
        firebaseList.set(updatedList);
        return updatedList;
      });
    }
  };

  useEffect(() => {
    firebaseList.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        saveToList(data);
      } else {
        saveToList([]);
      }
    });
  }, []);

  const addItem = () => {
    if (enteredItem.length === 0) {
      return;
    }
    saveToList();
    setEnteredItem("");
  };

  return (
    <SafeAreaView style={styles.viewWrapper}>
      <Text style={styles.header}>Einkaufen</Text>
      <TextInput
        placeholder="Produkt"
        value={enteredItem}
        style={styles.textInput}
        onChangeText={setEnteredItem}
      />
      <TouchableOpacity onPress={addItem} style={styles.addButton}>
        <Text style={styles.addButtonText}>Hinzufügen</Text>
      </TouchableOpacity>
      <FlatList
        data={allItems}
        keyExtractor={(itemData) => Math.random().toString(36) + itemData.value}
        renderItem={(itemData) => {
          return <Text>{itemData.item.value}</Text>;
        }}
      ></FlatList>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create(listStyles);

export default List;
