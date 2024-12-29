import {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, useColorScheme, FlatList, StatusBar, TextInput } from "react-native";


export default function Index() {

  const colorScheme = useColorScheme(); // Detect light or dark mode
  const fontColorCode = colorScheme === 'dark' ? '#FFFFFF' : 'black';
  const bgColorCode = colorScheme === 'dark' ? '#15202b' : '#FFFFFF';
  const defaultFontSize = 18;
  const defaultColor = 'grey';
  const styles = StyleSheet.create({
    rootBox: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: bgColorCode,
      paddingTop: StatusBar.currentHeight + 20 || 0,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      margin: 10
    },
    addButton: {
      backgroundColor: defaultColor,
      padding: 15
    },
    addButtonText: {
      fontWeight: 'bold'
    },
    counterButton: {
      backgroundColor: defaultColor,
      padding: 30
    },
    counterButtonText: {
      fontWeight: 'bold',
      fontSize: 25
    },
    removeButton: {
    },
    removeButtonText: {
      fontWeight: 'bold',
      fontSize: 22,
      color: 'red'
    },
    itemsBox: {
      justifyContent: 'space-between',
      alignItems: 'center', 
      flexDirection: 'row'
    },
    itemTextsBox: {
      justifyContent: 'center',
      alignItems: 'center', 
      padding: 12,     
    },
    itemText: {
      // ...StyleSheet.flatten(styles0.text),  // This will inherit styles.textStyle
      color: fontColorCode, 
      fontSize: defaultFontSize
    },
    addItemBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10
    },
    input: {
      height: 50,
      borderColor: defaultColor,
      borderWidth: 1,
      width: '60%',
      paddingLeft: 10,
      borderRadius: 50,
      color: fontColorCode,
      placeholderTextColor: fontColorCode
    },
  });

  const [items, setItems] = useState([
    { id: '1', name: 'Tea', count: 0 },
    { id: '2', name: 'Coffee', count: 0 },
    { id: '3', name: 'Dosa', count: 0 }
  ]);
  const [newItemName, setNewItemName] = useState(''); // To capture the name of the new item

  // Function to increment or decrement the count
  const updateCount = (id, action) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, count: action === '+' ? item.count + 1 : ((item.count - 1) < 0 ? 0 : item.count - 1) }
          : item
      )
    );
  };

  // Function to delete an item by id
  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  // Function to add a new item
  const addItem = () => {
    if (!newItemName.trim()) return; // Do not add empty or whitespace-only items

    const newItem = {
      id: String(items.length + 1),  // Simple ID generation (could be improved)
      name: newItemName,
      count: 0,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setNewItemName(''); // Clear the input after adding the item
  };

  // Render each item in the list
  const renderItem = ({ item }) => (
      <View style={styles.itemsBox}>

        <TouchableOpacity style={[styles.button, styles.counterButton]}
          onPress={() => updateCount(item.id, '-')}>
            <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>

        <View style={styles.itemTextsBox}>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>{item.count}</Text>
        </View>

        <TouchableOpacity style={[styles.button, styles.counterButton]}
          onPress={() => updateCount(item.id, '+')}>
            <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.removeButton]}
          onPress={() => deleteItem(item.id)}>
            <Text style={styles.removeButtonText}>x</Text>
        </TouchableOpacity>

      </View>
  );

  return (
    <View style={styles.rootBox}>

      <View style={styles.addItemBox}>
        <TextInput
            style={styles.input}
            placeholder="Type new..."
            placeholderTextColor={defaultColor}
            value={newItemName}
            onChangeText={setNewItemName}
          />

        <TouchableOpacity style={[styles.button, styles.addButton]}
         onPress={() => addItem()}>
            <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

    </View>
  );
}
