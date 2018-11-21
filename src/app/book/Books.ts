import {inject, injectable} from 'inversify';
import ConnectionPool from '../db/ConnectionPool';
import {TYPES} from '../di/types';
import Book from './Book';

@injectable()
export default class Books {
  private connectionPool: ConnectionPool;

  constructor(@inject(TYPES.ConnectionPool) connectionPool: ConnectionPool) {
    this.connectionPool = connectionPool;
  }

  public async findAll(): Promise<Book[]> {
    const repository = await this.connectionPool.getRepository(Book);
    const books = await repository.find();
    return books;
  }

  public async findOne(id: number): Promise<Book | undefined> {
    try {
      const repository = await this.connectionPool.getRepository(Book);
      return repository.findOne(id);
    } catch (e) {
      console.error(e);
    }
  }

  public async insert(book: Book) {
    const repository = await this.connectionPool.getRepository(Book);
    return repository.save(book);
  }
}
