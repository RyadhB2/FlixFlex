
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/Colors';


export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 12
    },
    image: { width: "100%", height: 400, resizeMode: "cover" },
    title: {
        fontSize: 26,
        fontStyle: "italic",
        fontWeight: "700",
        textAlign: "left",
        color: colors.black,
        padding: 7
    },
    genre: {
        backgroundColor: colors.primary,
        color: colors.white,
        paddingVertical: 8,
        paddingHorizontal: 6,
        textAlign: "left",
        borderRadius: 10
    },
    productionCompany: {
        color: colors.gray_900,
        paddingVertical: 5,
        paddingHorizontal: 3,
        textAlign: "left",
        fontWeight: "900"
    },
    overview: {
        fontSize: 17,
        color: colors.black
    },
    info: {
        fontSize: 15,
        color: colors.gray_900,
        fontWeight: "700",
        paddingVertical: 4,
        marginRight: 4
    },
    vote: {
        fontSize: 20,
        marginRight: 7,
        textAlign: "center",
        color: colors.white,
        fontWeight: "bold",
    },
    row: { flexDirection: "row", alignItems: "center" },
    watchTrailerButton: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#b55c5c",
        marginVertical: 6
    },
    watchTrailerText: {
        color: colors.white,
        paddingVertical: 8,
        paddingHorizontal: 6,
        textAlign: "left",
        borderRadius: 10
    },
    bottomsheet_contentContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white
    },
});