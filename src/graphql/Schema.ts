import {GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql';
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
    }
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

const ArticleType = new GraphQLObjectType({
    name: 'Article',
    description: 'An article with slug, title, and body.',
    fields: {
        id: {type: GraphQLID}
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'These are the things we can change',
    fields: () => ({
        deleteArticle: {
            type: ArticleType,
            description: 'Delete an article with id and return the article that was deleted.',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (value, {id}) => {
                console.log("deleted", id, value);
                return {id, status: 'deleted'};
            }
        }
    })
});

const schema = new GraphQLSchema({query, mutation});
export {schema};
