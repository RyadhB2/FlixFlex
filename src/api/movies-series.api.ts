import createApiClient from "./apiClient";
import { Movie, MoviesInfos, MoviesSeriesParams, SearchMoviesSeriesParams, Serie, SeriesInfos, VideosInfos } from "../models/movies-series.models";

const apiClient = createApiClient();

export const getMoviesAPI = async (params: MoviesSeriesParams): Promise<MoviesInfos> => {

    try {
        const response = await apiClient
            .get('/3/movie/popular', {
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
            .get('3/tv/popular', {
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

export const getDetailsAPI = async (type: "Movie" | "Serie", id: number): Promise<Movie | Serie> => {
    try {
        const response = await apiClient
            .get(`/3/${type === "Movie" ? "movie" : "tv"}/${id}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export const getVideosAPI = async (type: "Movie" | "Serie", id: number): Promise<VideosInfos> => {
    try {
        const response = await apiClient
            .get(`/3/${type === "Movie" ? "movie" : "tv"}/${id}/videos`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export const searchMoviesAPI = async (params: SearchMoviesSeriesParams): Promise<MoviesInfos> => {
    try {
        const response = await apiClient
            .get('/3/search/movie', {
                params
            });
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export const searchSeriesAPI = async (params: SearchMoviesSeriesParams): Promise<SeriesInfos> => {
    try {
        const response = await apiClient
            .get('/3/search/tv', {
                params
            });
        return response.data;
    }
    catch (error) {
        throw error;
    }
};