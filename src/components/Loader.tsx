import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../theme/Colors";

const Loader: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator color={colors.primary} size={"large"} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Loader;
