import React, { useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
  TextInput
} from 'react-native';
import styles from './styles';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../../theme/Colors';
import ItemContainer from '../../components/ItemContainer';
import { useSeries } from '../../hooks/useSeries';
import { useNavigation } from '@react-navigation/native';
import { DefaultMainNavigationProp } from '../../utils/RoutersType';



const SeriesScreen: React.FC = () => {
  //State & Data
  const [searchQuery, setSearchQuery] = useState<string>("")

  const { seriesListToDisplay, isMainLoading, setRefreshing, setShouldFetch: setShouldFetchSeries
    , refreshing, isLoadingMore, setIsLoadingMore } = useSeries({ searchQuery });
  const endReached = useRef(false)

  //Hooks
  const navigation = useNavigation<DefaultMainNavigationProp>()


  //Effects

  //functions
  const onRefresh = () => {
    setRefreshing(true)
    setShouldFetchSeries(true)
  }

  //rendering
  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={() => navigation.navigate("TopRated", { forMedia: "Serie" })}
        style={styles.topRatedButton}>
        <Text style={styles.topRatedText}>CHECK TOP RATED</Text>
      </Pressable>
      <View style={styles.searchbarContainer}>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={colors.gray_900}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text)
          }}
          placeholder={"Search Series ...."} />
        <Pressable style={styles.searchButton} onPress={() => setShouldFetchSeries(true)}>
          <Text style={{ color: colors.white }}>Search!</Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        {isMainLoading ? <ActivityIndicator color={colors.primary} style={{ marginTop: 70, alignSelf: "center" }} /> :
          <FlatList
            contentContainerStyle={{ paddingVertical: 12, marginBottom: 200, flexGrow: 1 }}
            data={seriesListToDisplay}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item, index }) => {
              return (
                <ItemContainer item={item} onPress={() => navigation.navigate("Details", { id: item.id, type: "Serie" })} />
              )
            }
            }
            refreshing={refreshing}
            onRefresh={onRefresh}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            onEndReached={() => endReached.current = true}
            onEndReachedThreshold={0.5}
            onMomentumScrollEnd={() => {
              if (endReached.current === true && !isLoadingMore) {
                endReached.current = false
                setIsLoadingMore(true)
              }
            }}
            ListFooterComponent={() =>
              <View style={{ minHeight: 100 }}>
                {isLoadingMore ?
                  <ActivityIndicator size={50} color={colors.primary} style={{ marginVertical: 16 }} />
                  : null
                }
              </View>}
            ListEmptyComponent={() =>
              <View style={{ flexGrow: 1, alignSelf: "center" }}>
                <Text>Nothing to see yet ...</Text>
              </View>
            }
          />
        }
      </View>

    </View >
  );
};

export default SeriesScreen;
