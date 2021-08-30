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

const applySort = (movies: Movie[], sortOptions: [MovieSort] | undefined) => {
    if (!sortOptions) return movies;

    return movies.sort((a, b) => {
        let result = 0;

        sortOptions.forEach((so, i, arr) => {
            result = 0;
            if (i != 0 && a[arr[i - 1].field] === b[arr[i - 1].field]) return;
            let order = 1;

            if (so.order && so.order === SortOrder.DESC) order *= -1;

            if (!a[so.field]) {
                result = -1 * order;
                return;
            } else if (!b[so.field]) {
                result = 1 * order;
                return;
            }

            // works flawlessly until here (number only). Number doesnt trigger

            if (isNaN(a[so.field] as any) === false && isNaN(b[so.field] as any) === false) {
                console.log('Is numba');
                result = (a[so.field] as number) - (b[so.field] as number) >= 0 ? order : order * -1;
            } else {
                console.log('Is stringu')
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