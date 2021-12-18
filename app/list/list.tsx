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
import DismissKeyboard from "../components/dismiss-keyboard";
import ListItem from "./list-item";
import { listStyles } from "./styles";

export interface IListItem {
  checked: boolean;
  value: string;
}

export interface IListItemDB {
  checked: number;
  value: string;
}

const List = () => {
  const [updating, setUpdating] = useState(false);
  const [enteredItem, setEnteredItem] = useState("");
  const [allItems, setAllItems] = useState<IListItem[]>([]);
  const firebaseList = firebase.database().ref("/");

  useEffect(() => {
    if (updating) {
      return;
    }

    (async () => {
      firebaseList.on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          updateList(data, false);
        } else {
          updateList([], false);
        }
      });
    })();
  }, []);

  const deleteItem = useCallback(
    (index: number) => {
      if (updating) {
        return;
      }

      (async () => {
        setUpdating(true);
        const listCopy = [...allItems].filter((_, i) => i !== index);
        updateList(listCopy);
        setUpdating(false);
      })();
    },
    [allItems, updating]
  );

  const updateItem = useCallback(
    (itemValue: string, index: number) => {
      if (updating) {
        return;
      }

      (async () => {
        setUpdating(true);

        const listCopy = [...allItems].map((e, i) => {
          if (i === index) {
            return {
              value: itemValue,
              checked: e.checked,
            };
          }
          return e;
        });
        updateList(listCopy);
        setUpdating(false);
      })();
    },
    [allItems, updating]
  );

  const toggleItem = useCallback(
    (index: number) => {
      if (updating) {
        return;
      }

      (async () => {
        setUpdating(true);
        const listCopy = [...allItems];
        const orgItem = listCopy[index];
        const listItem = {
          checked: !orgItem.checked,
          value: orgItem.value,
        };

        listCopy[index] = listItem;
        updateList(listCopy);
        setUpdating(false);
      })();
    },
    [allItems, updating]
  );

  const updateList = useCallback(
    (list: IListItem[], updateListOnServer = true) => {
      if (updating) {
        return;
      }

      (async () => {
        setUpdating(true);
        setAllItems(list);
        if (updateListOnServer) {
          await firebaseList.set(list);
        }
        setUpdating(false);
      })();
    },
    [allItems, updating]
  );

  const addToList = useCallback(() => {
    if (!enteredItem || updating) {
      return;
    }
    setUpdating(true);
    setAllItems((all) => {
      const item = {
        checked: false,
        value: enteredItem,
      };

      const updatedList = all.length > 0 ? [...all, item] : [item];
      (async () => {
        await firebaseList.set(updatedList);
        setUpdating(false);
      })();

      return updatedList;
    });
  }, [enteredItem, updating]);

  const addItem = useCallback(() => {
    if (enteredItem.length === 0) {
      return;
    }
    addToList();
    setEnteredItem("");
  }, [enteredItem]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <DismissKeyboard>
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
      </DismissKeyboard>
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={allItems}
        scrollEnabled={true}
        keyExtractor={(_, index) => Math.random().toString(36).substr(2, 5)}
        renderItem={({ item, index }) => {
          return (
            <ListItem
              item={item}
              isEven={index % 2}
              toggleItem={() => toggleItem(index)}
              deleteItem={() => deleteItem(index)}
              updateItem={(itemValue: string) => updateItem(itemValue, index)}
            ></ListItem>
          );
        }}
      ></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create(listStyles);

export default List;
