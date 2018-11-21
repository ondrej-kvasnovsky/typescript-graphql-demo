import {Connection, EntitySchema, ObjectType, Repository} from 'typeorm';

export default interface ConnectionPool {
  getConnection(): Promise<Connection>;
  getRepository<T>(target: ObjectType<T> | EntitySchema<T> | string): Promise<Repository<T>>;
}
