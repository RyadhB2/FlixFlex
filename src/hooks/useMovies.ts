import { useEffect, useRef, useState } from "react"
import { Movie } from "../models/movies-series.models";
import { getMoviesAPI } from "../api/movies-series.api";


export const useMovies = () => {
    const [moviesList, setMoviesList] = useState<Movie[] | undefined>([]);
    const initalMoviesList = useRef<Movie[] | undefined>(undefined)
    const [moviesListToDisplay, setMoviesListToDisplay] = useState<Movie[] | undefined>([]);

    const [isMainLoading, setIsMainLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const [refreshing, setRefreshing] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(true);

    const PAGE = useRef(1)
    const INDEX = useRef(0)

    useEffect(() => {
        //Fetch data only if it's the first time rendering the screen, or when refreshing the list
        if (shouldFetch) {
            async function fetchData() {
                try {
                    INDEX.current = 0
                    setIsMainLoading(true)
                    const res = await getMoviesAPI({ page: PAGE.current });
                    initalMoviesList.current = res.results;
                    setMoviesList(res.results)
                    setMoviesListToDisplay(res.results.slice(INDEX.current, INDEX.current + 10))
                    setIsMainLoading(false)
                    setShouldFetch(false)
                    setRefreshing(false)
                } catch (e) {
                    console.log(e)
                    setIsMainLoading(false)
                    setRefreshing(false)
                    setShouldFetch(false)
                }
            }
            fetchData();
        }

    }, [shouldFetch])

    // Loading more data when scrolling down
    useEffect(() => {
        if (isLoadingMore) {
            console.log("FETCHING MORE :")
            async function fetchMoreData() {
                try {
                    if (moviesList && moviesList[INDEX.current + 10]) {
                        console.log("WE JUST ADD 10 FROM MOVIES LIST");
                        INDEX.current += 10;
                        setMoviesListToDisplay(moviesListToDisplay?.concat(moviesList.slice(INDEX.current, INDEX.current + 10)))
                        setIsLoadingMore(false)

                    } else {
                        PAGE.current += 1;
                        const res = await getMoviesAPI({ page: PAGE.current });
                        setMoviesList(moviesList?.concat(res.results))
                        initalMoviesList.current = moviesList?.concat(res.results)
                        if (res.results) {
                            setMoviesListToDisplay(moviesListToDisplay?.concat(res.results.slice(0, 10)))
                            INDEX.current += 10;
                        }
                        setIsLoadingMore(false)
                    }
                } catch (e) {
                    console.log(e)
                    setIsLoadingMore(false)
                }
            }
            fetchMoreData();
        }
    }, [isLoadingMore])

    return {
        moviesList, moviesListToDisplay, setMoviesListToDisplay, initalMoviesList, isMainLoading,
        refreshing, setRefreshing, isLoadingMore, setIsLoadingMore, setShouldFetch
    }
}