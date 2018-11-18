import {Connection, createConnection} from 'typeorm';
import {typeOrmConfig} from './typeOrmConfig';

class ConnectionPool {
  private static instance: Connection;

  public async getConnection(): Promise<Connection> {
    if (!ConnectionPool.instance) {
      ConnectionPool.instance = await createConnection(typeOrmConfig);
    }
    return ConnectionPool.instance;
  }
}

const connectionPool = new ConnectionPool();
export {connectionPool};
