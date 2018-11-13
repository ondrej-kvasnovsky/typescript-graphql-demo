import {ApolloServer} from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import 'reflect-metadata';

import {schema} from './graphql/Schema';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.useBodyParser();
        this.useApolloServer();
    }

    private useBodyParser() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    private useApolloServer() {
        const server = new ApolloServer({schema});
        server.applyMiddleware({app: this.app});
    }
}

const app = new App();
export default app.app;
