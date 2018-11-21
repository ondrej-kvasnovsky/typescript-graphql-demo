import {Container} from 'inversify';
import App from '../App';
import Authors from '../author/Authors';
import Books from '../book/Books';
import ConnectionPool from '../db/ConnectionPool';
import PostgresConnectionPool from '../db/PostgresConnectionPool';
import {ApolloConfig} from '../graphql/ApolloConfig';
import {TYPES} from './types';

const container = new Container();
container.bind<ConnectionPool>(TYPES.ConnectionPool).to(PostgresConnectionPool).inSingletonScope();
container.bind<Authors>(TYPES.Authors).to(Authors).inSingletonScope();
container.bind<Books>(TYPES.Books).to(Books).inSingletonScope();
container.bind<App>(TYPES.App).to(App).inSingletonScope();
container.bind<ApolloConfig>(TYPES.ApolloConfig).to(ApolloConfig).inSingletonScope();

export {container};
