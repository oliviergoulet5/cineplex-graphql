import * as Relay from 'graphql-relay';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class PageInfo implements Relay.PageInfo {
    @Field(() => Boolean)
    hasNextPage: boolean;

    @Field(() => Boolean)
    hasPreviousPage: boolean;

    @Field(() => String, { nullable: true })
    startCursor: Relay.ConnectionCursor | null;

    @Field(() => String, { nullable: true })
    endCursor: Relay.ConnectionCursor | null;
}