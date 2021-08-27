import { Field, ObjectType, Int } from 'type-graphql';

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