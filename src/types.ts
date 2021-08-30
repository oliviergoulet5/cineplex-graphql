import { CineplexDataSource } from "./CineplexDataSource";
import { registerEnumType } from 'type-graphql';

export type Context = {
    dataSources: { cineplexAPI: CineplexDataSource }
};

type MPAARating = {
    province: string,
    ratingTitle: string,
    ratingDescription: string,
    warning?: string,
    imageUrl: string
}

export type MovieData = {
    isWatchListed: boolean,
    id: number,
    presentationType: string,
    name: string,
    releaseDate: string,
    firstShowStartDate: string,
    marketLanguageCode: string,
    isNowPlaying: boolean,
    isComingSoon: boolean,
    isReleasingSoon: boolean,
    isEvent: boolean,
    hasShowtimes: boolean,
    smallPosterImageUrl: string,
    mediumPosterImageUrl: string,
    largePosterImageUrl: string,
    mobileBackgroundImageUrl: string,
    mpaaRating: MPAARating,
    formats: string[],
    brightcoveVideoId: number,
    urlSlug: string,
    duration: string,
    vistaEventCode: string,
    vistaEventCodeVIP: string,
    seriesTicketingUrl: string,
    seriesTicketingVIPUrl: string,
    runtime: number
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC'
}

registerEnumType(SortOrder, {
    name: 'SortOrder',
    description: 'The order by which results are sorted'
});