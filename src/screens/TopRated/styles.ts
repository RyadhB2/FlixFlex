
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/Colors';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    cardsContainer: {
        paddingHorizontal: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    graphWrapper: {
        paddingHorizontal: 16,
        paddingTop: 30,
        paddingBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        color: colors.black,
        fontWeight: "600",
        fontSize: 20,
        padding: 5
    }
});