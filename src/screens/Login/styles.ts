
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/Colors';


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 16
    },
    button: {
        backgroundColor: colors.primary,
        height: 46,
    },
    labelButtonStyle: {
        color: colors.white
    }
});