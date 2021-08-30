import { Arg, Ctx, Query, Resolver, InputType, Field, Args } from 'type-graphql';
import { Context, SortOrder } from '../types';
import { Movie, SortableFields, MovieConnection } from '../entities/Movie';
import { swap } from '../utils/swap';
import { ConnectionArgs } from '../entities/ConnectionArgs';
import * as Relay from 'graphql-relay';

@InputType()
export class MovieSort {
    @Field(() => SortableFields)
    field: SortableFields

    @Field(() => SortOrder, { nullable: true })
    order?: SortOrder
}

/** Applies the sorting of movies by the fields specified.
 * @argument movies list of movies needed to be sorted 
 * @argument sortOptions array of sorts needed to be done
 * */
const applySort = (movies: Movie[], sortOptions: [MovieSort] | undefined) => {
    if (!sortOptions) return movies;

    return movies.sort((a, b) => {
        let result = 0;
        sortOptions.forEach((so, i, arr) => {
            // Sort by first sort option
            if (i === 0) { 
                result = swap(a[so.field], b[so.field], so.order)
                return;
            };
            
            // If two movies don't have the same field from previous sort, there is no reason to sort again with current sort option.
            if (a[arr[i - 1].field] !== b[arr[i - 1].field]) return;

            result = swap(a[so.field], b[so.field], so.order);
        });

        return result;
    });
}

@Resolver()
export class MovieResolver {
    @Query(() => MovieConnection)
    async movies(
        @Args(() => ConnectionArgs) connectionArgs: ConnectionArgs,
        @Arg('sort', () => [MovieSort], { nullable: true }) sortOptions: [MovieSort] | undefined,
        @Ctx() { dataSources: { cineplexAPI } }: Context
    ) {
        const movies = await cineplexAPI.getMovies();
        
        applySort(movies, sortOptions);

        let c = Relay.connectionFromArray(movies, connectionArgs);

        return c;
    }
}