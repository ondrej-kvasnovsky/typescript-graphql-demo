import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql';

import Item from '../models/Item';
import {connectionPool} from '../db/ConnectionPool';

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
    },
});
const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        items: {
            type: new GraphQLList(ItemType),
            description: 'Returns list of items',
            resolve: async () => {
                const connection = await connectionPool.getConnection();
                try {
                    const repository = connection.getRepository(Item);
                    const response = await repository.find();
                    return response;
                } finally {
                    await connection.close();
                }
            },
        },
    }),
});
const schema = new GraphQLSchema({query});
export {schema};
