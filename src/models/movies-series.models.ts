
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

export interface MoviesInfos {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
}