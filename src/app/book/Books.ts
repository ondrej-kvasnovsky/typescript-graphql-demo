import {connectionPool} from '../db/ConnectionPool';
import Book from './Book';

export class Books {
  // TODO: probably add IoC to solve all these issues and make it testable (using constructor for DI)
  // constructor() {
  //   this.connection = await connectionPool.getConnection();
  // }

  public async findAll() {
    const connection = await connectionPool.getConnection();
    try {
      const repository = connection.getRepository(Book);
      return await repository.find();
    } catch (e) {
      console.error(e);
    }
  }

  public async findOne(id: number) {
    const connection = await connectionPool.getConnection();
    try {
      const repository = connection.getRepository(Book);
      return repository.findOne(id);
    } catch (e) {
      console.error(e);
    }
  }

  public async insert(book: Book) {
    const connection = await connectionPool.getConnection();
    const repository = connection.getRepository(Book);
    return repository.save(book);
  }
}
