
export interface MoviesSeriesParams {
    page: number
}
export interface SearchMoviesSeriesParams extends MoviesSeriesParams {
    query: string
}
export interface Genre {
    id: number;
    name: string
}
export interface ProductionCompanie {
    id: number;
    name: string
}
export interface Episode {
    id: number;
    air_date: string;
    episode_number: number;
    name: string
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    video: boolean;
    vote_average: number;
    genres?: Genre[];
    production_companies?: ProductionCompanie[]
    revenue?: number;
}
export interface Serie {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
    video: boolean;
    vote_average: number;
    genres?: Genre[];
    production_companies?: ProductionCompanie[]
    last_air_date?: string;
    number_of_seasons?: number;
    number_of_episodes?: number;
    next_episode_to_air?: Episode
}

export interface MoviesInfos {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
}
export interface SeriesInfos {
    results: Serie[];
    page: number;
    total_pages: number;
    total_results: number;
}

export type Media = Serie | Movie

export interface Video {
    id: string;
    type: string;
    key: string;
    site: string;
}
export interface VideosInfos {
    id: number;
    results: Video[];
}