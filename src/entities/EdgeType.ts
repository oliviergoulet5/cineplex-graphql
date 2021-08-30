import * as Relay from "graphql-relay";
import { ObjectType, Field, ClassType } from "type-graphql";

export function EdgeType<NodeType>(nodeName: string, nodeType: ClassType<NodeType>) {
    @ObjectType(`${nodeName}Edge`, { isAbstract: true })
    abstract class Edge implements Relay.Edge<NodeType> {
        @Field(() => nodeType)
        node: NodeType;

        @Field(() => String, {
            description: 'Used in `before` and `after` args',
        })
        cursor: Relay.ConnectionCursor;
    }

    return Edge;
}