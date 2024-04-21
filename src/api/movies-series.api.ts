import createApiClient from "./apiClient";
import { MoviesInfos, MoviesSeriesParams, SeriesInfos } from "../models/movies-series.models";

const apiClient = createApiClient();

export const getMoviesAPI = async (params: MoviesSeriesParams): Promise<MoviesInfos> => {

    try {
        const response = await apiClient
            .get('/3/discover/movie', {
                params
            });
        return response.data;
    }
    catch (error) {
        throw error;
    }
};


export const getSeriesAPI = async (params: MoviesSeriesParams): Promise<SeriesInfos> => {

    try {
        const response = await apiClient
            .get('/3/discover/tv', {
                params
            });
        return response.data;
    }
    catch (error) {
        throw error;
    }
};
type forMedia = "Movie" | "Serie";
export const getTopRated = async (forMedia: forMedia): Promise<SeriesInfos | MoviesInfos> => {
    const media = forMedia === "Movie" ? "movie" : "tv"
    try {
        const response = await apiClient
            .get(`/3/${media}/top_rated`, {
                params: {
                    page: 1
                }
            });
        return response.data;
    }
    catch (error) {
        throw error;
    }
};
