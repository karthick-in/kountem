import { StyleSheet, StatusBar } from 'react-native';

export const COLORS = {
  dark: {
    font: '#FFFFFF',
    background: '#15202b',
  },
  light: {
    font: 'black',
    background: '#FFFFFF',
  },
  grey: 'grey',
};

export const CONSTANTS = {
  defaultFontSize: 18,
};

export const getStyles = (colorScheme: 'light' | 'dark' | null | undefined) => {
  const isDark = colorScheme === 'dark';
  const fontColorCode = isDark ? COLORS.dark.font : COLORS.light.font;
  const bgColorCode = isDark ? COLORS.dark.background : COLORS.light.background;
  const defaultColor = COLORS.grey;
  const defaultFontSize = CONSTANTS.defaultFontSize;

  return StyleSheet.create({
    rootBox: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
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
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center', 
      flexDirection: 'row',
      paddingHorizontal: 10,
    },
    itemTextsBox: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center', 
      padding: 12,     
    },
    itemText: {
      color: fontColorCode, 
      fontSize: defaultFontSize
    },
    hintText: {
      fontStyle: 'italic',
      fontSize: 12
    },
    addItemBox: {
      width: '100%',
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
};
