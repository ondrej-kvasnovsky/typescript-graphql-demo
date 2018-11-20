import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';

import Author from '../author/Author';
import Book from '../book/Book';

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [
    Book,
    Author,
  ],
};

export {typeOrmConfig};
