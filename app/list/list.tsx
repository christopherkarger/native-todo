import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firebase from "../../firebase";
import ListItem from "./list-item";
import { listStyles } from "./styles";

interface IListItem {
  checked: boolean;
  value: string;
}

const List = () => {
  const [enteredItem, setEnteredItem] = useState("");
  const [allItems, setAllItems] = useState<IListItem[]>([]);
  const firebaseList = firebase.database().ref("/");

  const deleteItem = useCallback(
    (index: number) => {
      const listCopy = [...allItems];
      updateList(
        listCopy.filter((_, i) => i !== index),
        true
      );
    },
    [allItems]
  );

  const toggleItem = useCallback(
    (index: number) => {
      const listCopy = [...allItems];
      const orgItem = listCopy[index];
      const listItem = {
        checked: !orgItem.checked,
        value: orgItem.value,
      };

      listCopy[index] = listItem;
      updateList(listCopy, true);
    },
    [allItems]
  );

  const updateList = useCallback(
    (list: IListItem[], updateListOnServer?: boolean) => {
      setAllItems(list);
      if (updateListOnServer) {
        firebaseList.set(list);
      }
    },
    [allItems]
  );

  const addToList = useCallback(() => {
    if (!enteredItem) {
      return;
    }
    setAllItems((all) => {
      const item = {
        checked: false,
        value: enteredItem,
      };
      const updatedList = all.length > 0 ? [...all, item] : [item];
      firebaseList.set(updatedList);
      return updatedList;
    });
  }, [enteredItem]);

  useEffect(() => {
    firebaseList.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        updateList(data);
      } else {
        updateList([]);
      }
    });
  }, []);

  const addItem = useCallback(() => {
    if (enteredItem.length === 0) {
      return;
    }
    addToList();
    setEnteredItem("");
  }, [enteredItem]);

  return (
    <SafeAreaView>
      <View style={styles.viewWrapper}>
        <Text style={styles.header}>Einkaufen</Text>
        <TextInput
          keyboardAppearance="dark"
          placeholder="Produkt"
          value={enteredItem}
          style={styles.textInput}
          onSubmitEditing={addItem}
          onChangeText={setEnteredItem}
        />
        <TouchableOpacity onPress={addItem} style={styles.addButton}>
          <Text style={styles.addButtonText}>Hinzufügen</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={allItems}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <ListItem
              item={item}
              isEven={index % 2}
              toggleItem={() => toggleItem(index)}
              deleteItem={() => deleteItem(index)}
            ></ListItem>
          );
        }}
      ></FlatList>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create(listStyles);

export default List;
