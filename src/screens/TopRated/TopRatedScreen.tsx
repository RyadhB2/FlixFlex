import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import styles from './styles';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../../theme/Colors';
import ItemContainer from '../../components/ItemContainer';
import { Media, Movie } from '../../models/movies-series.models';
import { getTopRated } from '../../api/movies-series.api';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DefaultMainNavigationProp, MainNavigatorParamList } from '../../utils/RoutersType';


const TopRatedScreen: React.FC = () => {
  //State & Data
  const [isMainLoading, setIsMainLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [topRatedList, setTopRatedList] = useState<Media[] | undefined>(undefined)
  const { forMedia } = useRoute<RouteProp<MainNavigatorParamList, "TopRated">>().params
  const firstRender = useRef(true)
  //Hooks
  const navigation = useNavigation<DefaultMainNavigationProp>()


  //Effects
  useEffect(() => {

  }, [])

  useEffect(() => {
    if (firstRender.current || refreshing) {
      async function fetchData() {
        try {
          setIsMainLoading(true)
          const res = await getTopRated(forMedia)
          setTopRatedList(res.results.slice(0, 5));
          setIsMainLoading(false)
          setRefreshing(false)
        } catch (e) {
          console.error(e)
          setIsMainLoading(false)
          setRefreshing(false)
        }
      }
      fetchData();
      firstRender.current = false
    }

  }, [refreshing])

  //functions
  const onRefresh = () => {
    setRefreshing(true)
  }

  //rendering
  return (
    <View style={styles.mainContainer}>
      <View style={{ flex: 1 }}>
        {isMainLoading ? <ActivityIndicator color={colors.primary} style={{ marginTop: 70, alignSelf: "center" }} /> :
          <FlatList
            contentContainerStyle={{ paddingVertical: 12, marginBottom: 200, flexGrow: 1 }}
            data={topRatedList}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item, index }) => {
              return (
                <ItemContainer item={item} onPress={() => navigation.navigate("Details", { id: item.id, type: (item as Movie)?.release_date !== undefined ? "Movie" : "Serie" })} />
              )
            }
            }
            refreshing={refreshing}
            onRefresh={onRefresh}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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

export default TopRatedScreen;
