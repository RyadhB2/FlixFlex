import React from "react";
import { Movie } from "../models/movies-series.models";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { format } from "date-fns"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { colors } from "../theme/Colors";

interface ItemContainerProps {
    item: Movie
    onPress: () => void
}


const ItemContainer: React.FC<ItemContainerProps> = ({ item, onPress }) => {
    return (
        <Pressable style={styles.mainContainer} onPress={onPress}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} width={100} height={100} />
                <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.row}>
                <Text>Release date :</Text>
                <Text numberOfLines={1} style={styles.date}>{format(item.release_date, "dd/MM/yyyy")}</Text>
            </View>

            <Text>Overview :</Text>
            <Text numberOfLines={4} style={[styles.text,]}>{`${item.overview}`}</Text>

            <View style={styles.row}>
                <Icon name="star" size={20} color={colors.primary} style={styles.circle} />
                <Text numberOfLines={1} style={[styles.text, { color: colors.primary }]}>{item.vote_average}</Text>
            </View>

        </Pressable >
    )
}

export default ItemContainer

const styles = StyleSheet.create({
    mainContainer: {
        padding: 16,
        backgroundColor: colors.white,
        borderBottomColor: colors.primary,
        borderBottomWidth: 1
    },
    title: {

        color: colors.black,
        marginBottom: 3
    },
    date: {
        color: "gray"
    },
    text: {
        color: "gray",
        marginRight: 3
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: 5
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2
    },
    circle: {
        marginRight: 5
    }
})