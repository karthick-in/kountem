import { StyleSheet, StatusBar, Platform } from 'react-native';

export const COLORS = {
  dark: {
    font: '#FFFFFF',
    background: '#15202b',
  },
  light: {
    font: '#000000',
    background: '#FFFFFF',
  },
  grey: 'grey',
};

export const CONSTANTS = {
  defaultFontSize: 18,
};

const createStyles = (theme: 'light' | 'dark') => {
  const isDark = theme === 'dark';
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
      // StatusBar.currentHeight is only available on Android
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
      fontWeight: 'bold',
      color: '#000000', // Explicit color for buttons
    },
    counterButton: {
      backgroundColor: defaultColor,
      padding: 30
    },
    counterButtonText: {
      fontWeight: 'bold',
      fontSize: 25,
      color: '#000000', // Explicit color for buttons
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
      fontSize: defaultFontSize,
      // Fix for web production link colors if onPress is used
      textDecorationLine: 'none',
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
      backgroundColor: bgColorCode, // Explicit background for input
    },
    editItemInput: {
      height: 50,
      borderColor: defaultColor,
      borderWidth: 1,
      margin: 10,
      paddingLeft: 10,
      borderRadius: 50,
      color: fontColorCode,
      backgroundColor: bgColorCode,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
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

const stylesLight = createStyles('light');
const stylesDark = createStyles('dark');

export const getStyles = (colorScheme: 'light' | 'dark' | null | undefined) => {
  return colorScheme === 'dark' ? stylesDark : stylesLight;
};
