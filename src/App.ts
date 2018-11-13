import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {typeOrmConfig} from './config';

import express from 'express';
import Item from './models/Item';

const bodyParser = require('body-parser');

const {ApolloServer} = require('apollo-server-express');
const {GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.mountRoutes();
        const schema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: 'Query',
                fields: {
                    hello: {
                        type: GraphQLString,
                        description: 'Returns list of items',
                        resolve: async () => {
                            const connection = await createConnection(typeOrmConfig);
                            try {
                                const repository = connection.getRepository(Item);
                                const response = await repository.find();
                                return JSON.stringify(response);
                            } finally {
                                await connection.close();
                            }
                        },
                    },
                },
            }),
        });
        const server = new ApolloServer({schema});
        server.applyMiddleware({app: this.app});

        // let dbUrl = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost/postgres";
    }

    private mountRoutes(): void {
        const router = express.Router();
        router.get('/items', async (req, res) => {
            const connection = await createConnection(typeOrmConfig);
            console.log('PG connected.');
            try {
                const repository = connection.getRepository(Item);
                const response = await repository.find();
                res.json({content: response});
            } finally {
                await connection.close();
                console.log('PG connection closed.');
            }
        });
        router.post('/items', async (req, res) => {
            const connection = await createConnection(typeOrmConfig);
            console.log('PG connected.');
            try {
                const repository = connection.getRepository(Item);
                await repository.save({name: req.body.name});
                res.json({
                    res: 'Ok'
                });
            } catch (e) {
                console.log(e);
                res.json({
                    res: 'Failed'
                });
            } finally {
                await connection.close();
                console.log('PG connection closed.');
            }
        });
        this.app.use('/', router);
    }
}

let app = new App();
export default app.app;
