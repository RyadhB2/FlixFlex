import React, { useRef } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import { useMovies } from '../../hooks/useMovies';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../../theme/Colors';
import ItemContainer from '../../components/ItemContainer';
import { useNavigation } from '@react-navigation/native';
import { DefaultMainNavigationProp } from '../../utils/RoutersType';



const MoviesScreen: React.FC = () => {
  //State & Data
  const { moviesListToDisplay, isMainLoading, setRefreshing, setShouldFetch: setShouldFetchMovies
    , refreshing, isLoadingMore, setIsLoadingMore } = useMovies();
  const endReached = useRef(false)

  //Hooks
  const navigation = useNavigation<DefaultMainNavigationProp>()

  //Effects

  //functions
  const onRefresh = () => {
    setRefreshing(true)
    setShouldFetchMovies(true)
  }

  //rendering
  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1 }}>
        <Pressable style={styles.topRatedButton} onPress={() => navigation.navigate("TopRated", { forMedia: "Movie" })}>
          <Text style={styles.topRatedText}>CHECK TOP RATED</Text>
        </Pressable>
        {isMainLoading ? <ActivityIndicator color={colors.primary} style={{ marginTop: 70, alignSelf: "center" }} /> :
          <FlatList
            contentContainerStyle={{ paddingVertical: 12, marginBottom: 200, flexGrow: 1 }}
            data={moviesListToDisplay}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item, index }) => {
              return (
                <ItemContainer item={item} onPress={() => navigation.navigate("Details", { id: item.id, type: "Movie" })} />
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

export default MoviesScreen;
