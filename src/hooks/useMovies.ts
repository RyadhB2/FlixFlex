import { useEffect, useRef, useState } from "react"
import { Movie } from "../models/movies-series.models";
import { getMoviesAPI, searchMoviesAPI } from "../api/movies-series.api";

interface useMoviesParams {
    searchQuery: string
}

export const useMovies = (params: useMoviesParams) => {
    const [moviesList, setMoviesList] = useState<Movie[] | undefined>([]);
    const [moviesListToDisplay, setMoviesListToDisplay] = useState<Movie[] | undefined>([]);

    const [isMainLoading, setIsMainLoading] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const [refreshing, setRefreshing] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(true);

    const searchQuery = params?.searchQuery
    const PAGE = useRef(1)
    const INDEX = useRef(0)

    useEffect(() => {
        //Fetch data only if it's the first time rendering the screen, or when refreshing the list
        if (shouldFetch) {
            async function fetchData() {
                try {
                    INDEX.current = 0
                    setIsMainLoading(true)
                    let res
                    if (searchQuery === "")
                        res = await getMoviesAPI({ page: PAGE.current });
                    else res = await searchMoviesAPI({ page: PAGE.current, query: searchQuery });
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

    }, [shouldFetch, searchQuery])

    // Loading more data when scrolling down
    useEffect(() => {
        if (isLoadingMore) {
            async function fetchMoreData() {
                try {
                    if (moviesList && moviesList[INDEX.current + 10]) {
                        INDEX.current += 10;
                        setMoviesListToDisplay(moviesListToDisplay?.concat(moviesList.slice(INDEX.current, INDEX.current + 10)))
                        setIsLoadingMore(false)

                    } else {
                        PAGE.current += 1;
                        let res
                        if (searchQuery === "")
                            res = await getMoviesAPI({ page: PAGE.current });
                        else res = await searchMoviesAPI({ page: PAGE.current, query: searchQuery });
                        setMoviesList(moviesList?.concat(res.results))
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
        moviesList, moviesListToDisplay, setMoviesListToDisplay, isMainLoading,
        refreshing, setRefreshing, isLoadingMore, setIsLoadingMore, setShouldFetch
    }
}