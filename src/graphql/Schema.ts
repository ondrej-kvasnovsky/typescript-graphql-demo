import {GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql';
import {findAll} from '../items/findAll';
import {findOne} from '../items/findOne';

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
                return await findAll();
            }
        },
        item: {
            type: new GraphQLList(ItemDetailType),
            description: 'Returns an item',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: async (id) => {
                return await findOne(id);
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
