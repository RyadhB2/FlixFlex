
export interface MoviesSeriesParams {
    page: number
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    video: boolean;
    vote_average: number
}
export interface Serie {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
    video: boolean;
    vote_average: number
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