import { Arg, Ctx, Query, Resolver, InputType, Field } from 'type-graphql';
import { Context, SortOrder } from '../types';
import { Movie, SortableFields } from '../entities/Movie';

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
            result = 0;

            // if a and b aren't equal from last sorted field, we don't need to sort by next sort.
            if (i != 0 && a[arr[i - 1].field] !== b[arr[i - 1].field]) return;
            
            let order = 1;

            // invert order factor if sort order is set to descending
            if (so.order && so.order === SortOrder.DESC) order *= -1;

            // if either field is undefined, swap values so that movie is above (if ascending) or below (if descending) of the sorted list
            if (!a[so.field]) {
                result = -1 * order;
                return;
            } else if (!b[so.field]) {
                result = 1 * order;
                return;
            }

            // if field value is number, compare by subtraction (unnecessary, todo: remove)
            // else if string, compare with >
            if (isNaN(a[so.field] as any) === false && isNaN(b[so.field] as any) === false) {
                result = (a[so.field] as number) - (b[so.field] as number) >= 0 ? order : order * -1;
            } else {
                result = a[so.field] > b[so.field] ? order : order * -1;
            }
        });

        return result;
    });
}

@Resolver()
export class MovieResolver {
    @Query(() => [Movie])
    async movies(
        @Arg('sort', () => [MovieSort], { nullable: true }) sortOptions: [MovieSort] | undefined,
        @Ctx() { dataSources: { cineplexAPI } }: Context
    ) {
        const movies = await cineplexAPI.getMovies();
        
        applySort(movies, sortOptions);

        return movies;
    }
}