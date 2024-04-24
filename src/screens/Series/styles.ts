
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
    topRatedButton: {
        height: 64,
        backgroundColor: colors.primary,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        margin: 5
    },
    topRatedText: {
        color: colors.white
    },
    textInput: {
        color: colors.black,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 4,
        paddingHorizontal: 8,
        marginTop: 8,
        height: 46,
        flex: 1,
    },
    searchbarContainer: {
        flexDirection: "row",
        paddingHorizontal: 16,
        alignItems: "center",
    },
    searchButton: {
        backgroundColor: colors.secondary,
        marginLeft: 5,
        padding: 4,
        borderRadius: 5
    }
});