import {useRef, useState, useMemo} from 'react';
import { Text, View, TouchableOpacity, useColorScheme, FlatList, TextInput, Modal } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import UUID from 'react-native-uuid';
import { Ionicons } from '@expo/vector-icons';
import { getStyles, COLORS } from '../styles/index.styles';

export default function Index() {
  const colorScheme = useColorScheme(); // Detect light or dark mode
  const styles = useMemo(() => getStyles(colorScheme), [colorScheme]);
  const defaultColor = COLORS.grey;

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
    const focusAndSelect = (ref: React.RefObject<TextInput>, value: string) => {
      if (ref.current) {
        const len = value.length;
        ref.current.focus();
        const input = ref.current as any;
        if (typeof input.setSelection === 'function') {
          input.setSelection(len, len);
        } else if (typeof input.setSelectionRange === 'function') {
          input.setSelectionRange(len, len);
        }
      }
    };

    if (modalInputFocus === 'name') {
      focusAndSelect(modalNameRef, editItemName);
    } else if (modalInputFocus === 'count') {
      focusAndSelect(modalCountRef, editItemCount);
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
          <Text 
            style={styles.itemText} 
            onPress={() => openEditModal(item, 'name')}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text 
            style={styles.itemText} 
            onPress={() => openEditModal(item, 'count')}
            numberOfLines={1}
          >
            {item.count}
          </Text>
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
