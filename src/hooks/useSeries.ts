import { useEffect, useRef, useState } from "react"
import { Serie } from "../models/movies-series.models";
import { getSeriesAPI } from "../api/movies-series.api";


export const useSeries = () => {
    const [seriesList, setSeriesList] = useState<Serie[] | undefined>([]);
    const initalSeriesList = useRef<Serie[] | undefined>(undefined)
    const [seriesListToDisplay, setSeriesListToDisplay] = useState<Serie[] | undefined>([]);

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
                    const res = await getSeriesAPI({ page: PAGE.current });
                    initalSeriesList.current = res.results;
                    setSeriesList(res.results)
                    setSeriesListToDisplay(res.results.slice(INDEX.current, INDEX.current + 10))
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
            async function fetchMoreData() {
                try {
                    if (seriesList && seriesList[INDEX.current + 10]) {
                        INDEX.current += 10;
                        setSeriesListToDisplay(seriesListToDisplay?.concat(seriesList.slice(INDEX.current, INDEX.current + 10)))
                        setIsLoadingMore(false)

                    } else {
                        PAGE.current += 1;
                        const res = await getSeriesAPI({ page: PAGE.current });
                        setSeriesList(seriesList?.concat(res.results))
                        initalSeriesList.current = seriesList?.concat(res.results)
                        if (res.results) {
                            setSeriesListToDisplay(seriesListToDisplay?.concat(res.results.slice(0, 10)))
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
        seriesList, seriesListToDisplay, setSeriesListToDisplay, initalSeriesList, isMainLoading,
        refreshing, setRefreshing, isLoadingMore, setIsLoadingMore, setShouldFetch
    }
}