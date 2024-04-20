
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
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
});