import { useNavigation } from "@react-navigation/native"
import { Alert, Pressable, StyleSheet, Text, View } from "react-native"
import { DefaultMainNavigationProp } from "../utils/RoutersType"
import { colors } from "../theme/Colors"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useAppDispatch } from "../redux/store/ConfigureStore"
import { logout } from "../slices/user.slice"

interface HeaderProps {
    for: "Movie" | "Serie"
}
const Header: React.FC<HeaderProps> = (props) => {
    const navigation = useNavigation<DefaultMainNavigationProp>()
    const dispatch = useAppDispatch()
    async function handleLogout() {
        try {
            Alert.alert("You are about to log out !", "Are you sure you want to continue", [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'Yes', onPress: async () => await dispatch(logout()) },
            ]);
        } catch (error) {
            Alert.alert("Error", "An error happend while loging out ...")
        }
    }
    return (
        <View style={styles.mainContainer}>
            <Pressable style={styles.topRatedButton} onPress={() => navigation.navigate("TopRated", { forMedia: props.for })}>
                <Text style={styles.topRatedText}>CHECK TOP RATED</Text>
            </Pressable>
            <Pressable style={styles.logoutButton} onPress={handleLogout}>
                <Icon name="logout" size={25} color={colors.gray_900} />
            </Pressable>
        </View>
    )
}
export default Header

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        alignItems: "center",
        margin: 10
    },
    topRatedButton: {
        flex: 1,
        height: 64,
        backgroundColor: colors.primary,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",

    },
    topRatedText: {
        color: colors.white
    },
    logoutButton: {
        flex: 0.2,
        marginLeft: 4,
        justifyContent: "center",
        alignItems: "center"
    }
})