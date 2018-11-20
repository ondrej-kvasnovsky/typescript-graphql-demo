import {ApolloServer} from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import 'reflect-metadata';

import {ApolloConfig} from './graphql/ApolloConfig';

export class App {
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
    const schema = new ApolloConfig();
    const promise = schema.getApolloConfig();
    promise.then((apolloConfig) => {
      const server = new ApolloServer(apolloConfig);
      server.applyMiddleware({app: this.app});
    }).catch((err) => console.error(err));
  }
}
