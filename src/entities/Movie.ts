import { Field, ObjectType, Int, registerEnumType } from 'type-graphql';
import { EdgeType } from './EdgeType';
import { ConnectionType } from './ConnectionType';

@ObjectType()
export class Movie {
    @Field()
    name: string;

    @Field()
    releaseDate: string;

    @Field(() => Int)
    runtime: number;

    @Field()
    duration: string;

    @Field()
    marketLanguageCode: string;

    @Field()
    smallPosterImageUrl: string;

    @Field()
    mediumPosterImageUrl: string;

    @Field()
    largePosterImageUrl: string;

    @Field()
    urlSlug: string;

    @Field()
    presentationType: string;

    // todo: scalar for mpaaRating

    // Theatre Information
    @Field()
    firstShowStartDate: string;

    @Field()
    isNowPlaying: boolean;

    @Field()
    isComingSoon: boolean;

    @Field()
    isReleasingSoon: boolean;

    @Field()
    hasShowtimes: boolean;

    @Field()
    mobileBackgroundImageUrl: boolean;

    @Field()
    isEvent: boolean;

    @Field(() => [String])
    formats: string[];

    @Field()
    isWatchListed: string;

    @Field(() => Int)
    brightcoveVideoId: number;

    @Field()
    vistaEventCode: string;

    @Field()
    vistaEventCodeVIP: string;

    @Field()
    seriesTicketingUrl: string;

    @Field()
    seriesTicketingVIPUrl: string;
}

@ObjectType()
export class MovieEdge extends EdgeType('movie', Movie) {};

@ObjectType()
export class MovieConnection extends ConnectionType<MovieEdge>(
    'movie',
    MovieEdge,
) {};

export enum SortableFields {
    name = 'name',
    runtime = 'runtime'
}

registerEnumType(SortableFields, {
    name: 'SortableFields',
    description: 'Movie fields which are available to sort by.'
});