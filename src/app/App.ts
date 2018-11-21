import {ApolloServer} from 'apollo-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import 'reflect-metadata';

import {inject, injectable} from 'inversify';
import {TYPES} from './di/types';
import {ApolloConfig} from './graphql/ApolloConfig';

@injectable()
export default class App {
  public app: express.Application;
  private apolloConfig: ApolloConfig;

  constructor(@inject(TYPES.ApolloConfig) apolloConfig: ApolloConfig) {
    this.apolloConfig = apolloConfig;
    this.app = express();
    this.useBodyParser();
    this.useApolloServer();
  }

  private useBodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
  }

  private useApolloServer() {
    const promise = this.apolloConfig.getApolloConfig();
    promise.then((apolloConfig) => {
      const server = new ApolloServer(apolloConfig);
      server.applyMiddleware({app: this.app});
    }).catch((err) => console.error(err));
  }
}
