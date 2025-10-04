import {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, useColorScheme, FlatList, StatusBar, TextInput, Modal, Button } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import UUID from 'react-native-uuid';

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
      marginTop: StatusBar.currentHeight || 0,
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
      padding: 10
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
    hintText: {
      // marginBottom: 5,
      fontStyle: 'italic',
      fontSize: 12
    },
    addItemBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10
    },
    addItemInput: {
      height: 50,
      borderColor: defaultColor,
      borderWidth: 1,
      width: '60%',
      paddingLeft: 10,
      borderRadius: 50,
      color: fontColorCode
    },
    editItemInput: {
      height: 50,
      borderColor: defaultColor,
      borderWidth: 1,
      margin: 10,
      paddingLeft: 10,
      borderRadius: 50,
      color: fontColorCode,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalContainer: {
      width: '80%',
      padding: 20,
      backgroundColor: bgColorCode,
      borderRadius: 50,
    },
    modalEditButtonsBox: {
      flexDirection: 'row',
      justifyContent: 'center',
    }
  });

  const [items, setItems] = useState([
    { id: UUID.v4(), name: 'Tea', count: 0 },
    { id: UUID.v4(), name: 'Coffee', count: 0 },
    { id: UUID.v4(), name: 'Dosa', count: 0 }
  ]);
  const [newItemName, setNewItemName] = useState(''); // To capture the name of the new item
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [editItemId, setEditItemId] = useState(''); // State for the first input field
  const [editItemName, setEditItemName] = useState(''); // State for the first input field
  const [editItemCount, setEditItemCount] = useState(''); // State for the second input field

  // Function to increment or decrement the count
  const updateItemCount = (id, action) => {
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
      id: UUID.v4(),  // Simple ID generation (could be improved)
      name: newItemName,
      count: 0,
    };

    setItems((prevItems) => [...prevItems, newItem]);
    setNewItemName(''); // Clear the input after adding the item
  };

  const openEditModal = (item) => {
    setEditItemId(item.id);
    setEditItemName(item.name);
    setEditItemCount(String(item.count));
    setModalVisible(true);    
  }

  const saveEditModal = () => {
    // validate
    if(editItemName == '') { // TODO: add error message on popup
      return;
    }
    if(!isNaN(+editItemCount) || Number(editItemCount) < 0) {
      return
    }

    // save
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === editItemId
          ? { ...item, name: editItemName, count: Number(editItemCount) }
          : item
      )
    );

    closeEditModal(); // Close modal after submitting
  };

  const closeEditModal = () => {
    setModalVisible(false);
  }


  // Render each item in the list
  const renderItem = ({ item }) => (
      <View style={styles.itemsBox}>

        <TouchableOpacity style={[styles.button, styles.counterButton]}
          onPress={() => updateItemCount(item.id, '-')}>
            <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>

        <View style={styles.itemTextsBox}>
          <Text style={styles.itemText} onPress={() => openEditModal(item)}>{item.name}</Text>
          <Text style={styles.itemText} onPress={() => openEditModal(item)}>{item.count}</Text>
        </View>

        <TouchableOpacity style={[styles.button, styles.counterButton]}
          onPress={() => updateItemCount(item.id, '+')}>
            <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.removeButton]}
          onPress={() => deleteItem(item.id)}>
            <Text style={styles.removeButtonText}>x</Text>
        </TouchableOpacity>

      </View>
  );

  return (
   <SafeAreaProvider>
    <SafeAreaView style={styles.rootBox}>

    {/* <View style={styles.rootBox}> */}

      <View style={styles.addItemBox}>
        <TextInput
            style={styles.addItemInput}
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
      
      {items.length > 0 && (
        <Text style={[styles.itemText, styles.hintText]}>Hint: click item name to edit</Text>
      )}

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            
            <TextInput
              style={styles.editItemInput}
              value={editItemName}
              onChangeText={setEditItemName}
            />            
            <TextInput
              style={styles.editItemInput}
              value={editItemCount}
              onChangeText={setEditItemCount}
            />

            <View style={styles.modalEditButtonsBox}>
              <TouchableOpacity style={[styles.button, styles.addButton]}
                onPress={() => closeEditModal()}>
                  <Text style={styles.addButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.addButton]}
                onPress={() => saveEditModal()}>
                  <Text style={styles.addButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    {/* </View> */}
    
    </SafeAreaView>
   </SafeAreaProvider>
  );
}
