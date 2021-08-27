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
    marketLanguageCode: string;

    @Field()
    smallPosterImageUrl: string;
    
    @Field()
    mediumPosterImageUrl: string;

    @Field()
    largePosterImageUrl: string;

    // Theatre Information
    @Field()
    isNowPlaying: boolean;

    @Field(() => [String])
    formats: string[];

}