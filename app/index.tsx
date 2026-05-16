import {useRef, useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, useColorScheme, FlatList, StatusBar, TextInput, Modal, Button, Keyboard } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import UUID from 'react-native-uuid';
import { Ionicons } from '@expo/vector-icons';

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
      flex: 1,
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
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    addItemInput: {
      height: 50,
      borderColor: defaultColor,
      borderWidth: 1,
      flex: 1,
      paddingLeft: 15,
      borderRadius: 50,
      color: fontColorCode,
      marginRight: 5,
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
      borderRadius: 25,
    },
    modalEditButtonsBox: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    hintIcon: {
      marginLeft: 5,
    },
    tooltipContainer: {
      width: '85%',
      padding: 20,
      backgroundColor: bgColorCode,
      borderRadius: 20,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    tooltipTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 15,
      color: fontColorCode,
      textAlign: 'center',
    },
    tooltipPoint: {
      fontSize: 16,
      marginBottom: 10,
      color: fontColorCode,
      lineHeight: 22,
    },
    closeTooltipButton: {
      marginTop: 15,
      alignSelf: 'center',
      backgroundColor: defaultColor,
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 20,
    }
  });

  const [items, setItems] = useState([
    { id: UUID.v4(), name: 'Alpha', count: 0 },
    { id: UUID.v4(), name: 'Beta', count: 0 },
    { id: UUID.v4(), name: 'Gamma', count: 0 }
  ]);
  const [newItemName, setNewItemName] = useState(''); // To capture the name of the new item
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [hintModalVisible, setHintModalVisible] = useState(false); // State for hint tooltip
  const [editItemId, setEditItemId] = useState(''); // State for the first input field
  const [editItemName, setEditItemName] = useState(''); // State for the first input field
  const [editItemCount, setEditItemCount] = useState(''); // State for the second input field
  const [modalInputFocus, setModalInputFocus] = useState('name'); // 'name' or 'count'

  // Create refs for both text boxes
  const modalNameRef = useRef<TextInput>(null);
  const modalCountRef = useRef<TextInput>(null);

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

  const openEditModal = (item, fromInput='name') => {
    setEditItemId(item.id);
    setEditItemName(item.name);
    setEditItemCount(String(item.count));
    setModalInputFocus(fromInput);
    setModalVisible(true);
  }

  const saveEditModal = () => {
    let _editItemName = editItemName.trim()
    let _editItemCount = editItemCount.trim()

    // validate
    if(_editItemName == '') { // TODO: add error message on popup
      return;
    }
    if (!/^\d+$/.test(_editItemCount) || Number(_editItemCount) < 0) { // not a non-negative integer
      return;
    }

    // save
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === editItemId
          ? { ...item, name: _editItemName, count: Number(_editItemCount) }
          : item
      )
    );

    closeEditModal(); // Close modal after submitting
  };

  const closeEditModal = () => {
    setModalVisible(false);
  }

  const handleModalShow = () => {
    // Set focus
    if (modalInputFocus === 'name') {
      const len = editItemName.length;

      modalNameRef.current?.focus();
      modalNameRef.current?.setSelection(len, len);
    } else if (modalInputFocus === 'count') {
      const len = editItemCount.length;

      modalCountRef.current?.focus();
      modalCountRef.current?.setSelection(len, len);
    }
  };


  // Render each item in the list
  const renderItem = ({ item }) => (
      <View style={styles.itemsBox}>

        <TouchableOpacity style={[styles.button, styles.counterButton]}
          onPress={() => updateItemCount(item.id, '-')}>
            <Text style={styles.counterButtonText}>-</Text>
        </TouchableOpacity>

        <View style={styles.itemTextsBox}>
          <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail" onPress={() => openEditModal(item, 'name')}>{item.name}</Text>
          <Text style={styles.itemText} onPress={() => openEditModal(item, 'count')}>{item.count}</Text>
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

        <TouchableOpacity 
          style={styles.hintIcon} 
          onPress={() => setHintModalVisible(true)}
        >
          <Ionicons name="help-circle-outline" size={30} color={defaultColor} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={hintModalVisible}
        onRequestClose={() => setHintModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setHintModalVisible(false)}
        >
          <View style={styles.tooltipContainer}>
            <Text style={styles.tooltipTitle}>How to use?</Text>
            <Text style={styles.tooltipPoint}>• Add new items using the input box.</Text>
            <Text style={styles.tooltipPoint}>• Use + and - buttons to adjust quantities.</Text>
            <Text style={styles.tooltipPoint}>• Click item's name to edit it.</Text>
            <Text style={styles.tooltipPoint}>• Click the red x to remove an item.</Text>
            
            <TouchableOpacity 
              style={styles.closeTooltipButton}
              onPress={() => setHintModalVisible(false)}
            >
              <Text style={styles.addButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onShow={handleModalShow}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            
            <TextInput
              ref={modalNameRef}
              style={styles.editItemInput}
              value={editItemName}
              onChangeText={setEditItemName}
            />            
            <TextInput
              ref={modalCountRef}
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
