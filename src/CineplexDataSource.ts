import { RESTDataSource } from 'apollo-datasource-rest';
import { Movie } from './entities/Movie';
import { MovieData } from './types';

type MovieMap = Pick<MovieData, keyof Movie>;

export class CineplexDataSource extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://www.cineplex.com/api/v1/'
    }

    movieReducer(data: MovieData) {
        let m = new Movie();

        let interceptedFields: MovieMap = { ...data };

        let k: keyof Movie;
        for (k in interceptedFields) {
            (m as any)[k] = interceptedFields[k];
        }

        return m;
    }

    async getMovies() {
        try {
            const response = await this.get('movies', undefined, {
                headers: {
                    'User-Agent': ''
                } 
            }); 
            
            if (!response || !response.data) return [];

            const movieData: MovieData[] = response.data;
            const movies = movieData.map((movie: MovieData) => this.movieReducer(movie));

            return movies;
        } catch(err) {
            console.error(err);
            return [];
        }
    }
}