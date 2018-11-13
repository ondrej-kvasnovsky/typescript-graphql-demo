import {ApolloServer} from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import 'reflect-metadata';

import {schema} from './graphql/Schema';
import {router} from './rest/router';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.mountRestRoutes();
        this.mountGraphQL();
    }

    private mountGraphQL() {
        const server = new ApolloServer({schema});
        server.applyMiddleware({app: this.app});
    }

    private mountRestRoutes(): void {
        this.app.use('/', router);
    }
}

const app = new App();
export default app.app;
