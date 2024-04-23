import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Alert,
  Pressable
} from 'react-native';
import styles from './styles';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainNavigatorParamList } from '../../utils/RoutersType';
import { Media, Movie, Serie, Video } from '../../models/movies-series.models';
import { getDetailsAPI, getVideosAPI } from '../../api/movies-series.api';
import Loader from '../../components/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/Colors';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import YoutubePlayer from "react-native-youtube-iframe";



const OrderDetailsScreen: React.FC = () => {
  //State & Data
  const [item, setItem] = useState<Media | undefined>(undefined)
  const [isMainLoading, setIsMainLoading] = useState(true)
  const [videos, setVideos] = useState<Video[] | undefined>(undefined)
  const trailerVideo = videos?.filter((video) => video.site === "YouTube" && video.type === "Trailer")[0]
  const trailerAvailable = Boolean(trailerVideo)
  const { id, type } = useRoute<RouteProp<MainNavigatorParamList, "Details">>().params;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [1, "100%"], []);

  //Effects
  useEffect(() => {
    async function getDetails(id: number) {
      try {
        setIsMainLoading(true)
        const res = await getDetailsAPI(type, id)
        const videosRes = await getVideosAPI(type, id)
        const videos = videosRes.results
        setVideos(videos)
        setItem(res)
        setIsMainLoading(false)
      } catch (error) {
        Alert.alert("Error", "An error happend while getting the detils ...")
        console.error("Error ", error)
      }
    }
    getDetails(id)
  }, [])

  //functions


  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


  if (isMainLoading) return <Loader />
  //rendering
  return (
    <>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item?.poster_path}` }} style={styles.image} />
          <Text style={styles.title}>{(item as Movie).title ?? (item as Serie).name}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginVertical: 7 }}>
            {
              item?.genres ?
                item.genres.map((genre) => <Text style={styles.genre} key={genre.id}>{genre.name}</Text>)
                : null
            }
          </View>

          <Text style={styles.overview}>{item?.overview}</Text>

          <Pressable
            disabled={!trailerAvailable}
            style={[styles.watchTrailerButton, {
              backgroundColor: !trailerAvailable ? colors.gray_900 : colors.secondary,
              opacity: !trailerAvailable ? 0.5 : 1
            }]} onPress={() => { bottomSheetRef.current?.snapToIndex(1) }}>
            <Icon name='eye' size={16} color={colors.white} />
            <Text style={styles.watchTrailerText}>Watch Trailer</Text>
          </Pressable>

          <Text style={styles.info}>{`First Air Date : ${(item as Movie).release_date ?? (item as Serie).first_air_date}`}</Text>
          <View style={{ marginVertical: 7 }}>
            <Text style={styles.info}>Production Companies :</Text>
            {
              item?.production_companies ?
                item.production_companies.map((company) =>
                  <View style={styles.row} key={company.id}>
                    <Icon name='movie-roll' size={16} color={colors.primary} />
                    <Text style={styles.productionCompany} id={`${company.id}`}>{company.name}</Text>
                  </View>)
                : null
            }
          </View>

          {(item as Movie).revenue ?
            <Text style={styles.info}>{`Revenue : ${(item as Movie).revenue} $`}</Text>
            : null}

          {(item as Serie).number_of_seasons ?
            <View>
              <Text style={styles.info}> {`Number of seasons : ${(item as Serie).number_of_seasons}`}</Text>
              <Text style={styles.info}> {`Number of episodes : ${(item as Serie).number_of_episodes}`}</Text>
              {(item as Serie).next_episode_to_air ?
                <View style={{ marginVertical: 7 }}>
                  <Text style={styles.info}> {`Next Episode : `}</Text>
                  <View style={styles.row}>
                    <Icon name='dots-horizontal' size={20} color={colors.primary} />
                    <Text style={styles.info}> {`Air Date : ${(item as Serie).next_episode_to_air?.air_date} `}</Text>
                  </View>
                  <View style={styles.row}>
                    <Icon name='dots-horizontal' size={20} color={colors.primary} />
                    <Text style={styles.info}> {`Episode number : ${(item as Serie).next_episode_to_air?.episode_number} `}</Text>
                  </View>
                  <View style={styles.row}>
                    <Icon name='dots-horizontal' size={20} color={colors.primary} />
                    <Text style={styles.info}> {`Episode name :${(item as Serie).next_episode_to_air?.name} `}</Text>
                  </View>
                </View>


                : null}
              {(item as Serie).last_air_date ?
                <>
                  <Text style={styles.info}> {`Last Air date : ${(item as Serie).last_air_date}`}</Text>
                </> : null}
            </View>
            : null}
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#9c7606", }}>
            <Text style={styles.vote}> {item?.vote_average}</Text>
            <Icon name="star" color={colors.white} size={16} />
          </View>

        </View >
      </ScrollView >
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.bottomsheet_contentContainer}>
          <View style={{ flex: 1, width: "100%" }}>
            <YoutubePlayer
              height={500}
              videoId={trailerVideo?.key}
            />
            <Pressable style={styles.goBackButton}>
              <Text style={{ color: colors.white }}>Go back</Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default OrderDetailsScreen;
