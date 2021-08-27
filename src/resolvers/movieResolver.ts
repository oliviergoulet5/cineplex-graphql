import { Ctx, Query, Resolver } from 'type-graphql';
import { Context } from '../types';
import { Movie } from '../entities/Movie';

@Resolver()
export class MovieResolver {
    @Query(() => [Movie])
    async movies(
        @Ctx() { dataSources: { cineplexAPI } }: Context
    ) {
        const movies = await cineplexAPI.getMovies();

        return movies;
    }
}