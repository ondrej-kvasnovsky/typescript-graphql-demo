import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql';
import {resolveItems} from '../items/resolveItems';
import {resolveItemDetail} from '../items/test/resolveItemDetail';

const ItemType = new GraphQLObjectType({
    name: 'Item',
    fields: {
        id: {type: GraphQLID},
        name: {type: GraphQLString},
    },
});

const ItemDetailType = new GraphQLObjectType({
    name: 'ItemDetail',
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
                return await resolveItems();
            }
        },
        itemDetail: {
            type: new GraphQLList(ItemDetailType),
            description: 'Returns list of items',
            resolve: async () => {
                return await resolveItemDetail();
            }
        }
    }),
});

const schema = new GraphQLSchema({query});
export {schema};
