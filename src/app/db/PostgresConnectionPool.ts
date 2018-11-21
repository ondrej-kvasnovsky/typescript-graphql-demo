import {injectable} from 'inversify';
import {Connection, createConnection, EntitySchema, ObjectType, Repository} from 'typeorm';
import ConnectionPool from './ConnectionPool';
import {typeOrmConfig} from './typeOrmConfig';

@injectable()
export default class PostgresConnectionPool implements ConnectionPool {
  private instance: Connection | undefined;

  public async getConnection(): Promise<Connection> {
    if (!this.instance) {
      this.instance = await createConnection(typeOrmConfig);
    }
    return this.instance;
  }

  public async getRepository<T>(target: ObjectType<T> | EntitySchema<T> | string): Promise<Repository<T>> {
    if (!this.instance) {
      this.instance = await createConnection(typeOrmConfig);
    }
    return this.instance.getRepository(target);
  }
}
