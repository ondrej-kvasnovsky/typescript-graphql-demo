import {inject, injectable} from 'inversify';
import ConnectionPool from '../db/ConnectionPool';
import {TYPES} from '../di/types';
import Author from './Author';

@injectable()
export default class Authors {
  private connectionPool: ConnectionPool;

  constructor(@inject(TYPES.ConnectionPool) connectionPool: ConnectionPool) {
    this.connectionPool = connectionPool;
  }

  public async findAll() {
    try {
      const repository = await this.connectionPool.getRepository(Author);
      return repository.find();
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  public async findOne(id: number) {
    try {
      const repository = await this.connectionPool.getRepository(Author);
      return repository.findOne(id);
    } catch (e) {
      console.error(e);
    }
  }

  public async insert(author: Author) {
    const repository = await this.connectionPool.getRepository(Author);
    return repository.save(author);
  }
}
