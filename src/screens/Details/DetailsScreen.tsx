import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Alert
} from 'react-native';
import styles from './styles';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainNavigatorParamList } from '../../utils/RoutersType';
import { Media, Movie, Serie } from '../../models/movies-series.models';
import { getDetailsAPI } from '../../api/movies-series.api';
import Loader from '../../components/Loader';


const OrderDetailsScreen: React.FC = () => {
  //State & Data
  const [item, setItem] = useState<Media | undefined>(undefined)
  const [isMainLoading, setIsMainLoading] = useState(true)

  const { id, type } = useRoute<RouteProp<MainNavigatorParamList, "Details">>().params

  //Effects

  //functions
  useEffect(() => {

    async function getDetails(id: number) {
      try {
        setIsMainLoading(true)
        const res = await getDetailsAPI(type, id)
        setItem(res)
        setIsMainLoading(false)
      } catch (error) {
        Alert.alert("Error", "An error happend while getting the detils ...")
      }
    }
    getDetails(id)
  }, [])


  if (isMainLoading) return <Loader />
  //rendering
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item?.poster_path}` }} style={{ width: "100%", height: 400, resizeMode: "cover" }} />
        <Text>{(item as Movie).title ?? (item as Serie).name}</Text>
        {
          item?.genres ?
            item.genres.map((genre) => <Text key={genre.id}>{genre.name}</Text>)
            : null
        }
        <Text></Text>
        <Text>{item?.overview}</Text>
        <Text>{(item as Movie).release_date ?? (item as Serie).first_air_date}</Text>
        {
          item?.production_companies ?
            item.production_companies.map((company) => <Text id={`${company.id}`}>{company.name}</Text>)
            : null
        }
        {(item as Movie).revenue ?
          <Text>{`Revenue : ${(item as Movie).revenue}`}</Text>
          : null}
        <Text> {item?.vote_average}</Text>

        {(item as Serie).number_of_seasons ?
          <View>
            <Text> {` Number of seasons :${(item as Serie).number_of_seasons}`}</Text>
            <Text> {`Number of episodes : ${(item as Serie).number_of_episodes}`}</Text>
            {(item as Serie).next_episode_to_air ?
              <>
                <Text> {`Next Episode : `}</Text>
                <Text> {`==>${(item as Serie).next_episode_to_air?.air_date} `}</Text>
                <Text> {`==>${(item as Serie).next_episode_to_air?.episode_number} `}</Text>
                <Text> {`==>${(item as Serie).next_episode_to_air?.name} `}</Text>
              </> : null}
            {(item as Serie).last_air_date ?
              <>
                <Text> {`Last Air date : ${(item as Serie).last_air_date}`}</Text>
              </> : null}
          </View>
          : null}

      </View >
    </ScrollView>
  );
};

export default OrderDetailsScreen;
