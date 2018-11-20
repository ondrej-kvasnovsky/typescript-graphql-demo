import {connectionPool} from '../db/ConnectionPool';
import Author from './Author';
import Book from '../book/Book';

export class Authors {
  public async findAll() {
    const connection = await connectionPool.getConnection();
    try {
      const repository = connection.getRepository(Author);
      const response = await repository.find();
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  public async findOne(id: number) {
    const connection = await connectionPool.getConnection();
    try {
      const repository = connection.getRepository(Author);
      const response = await repository.findOne(id);
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  public async insert(author: Author) {
    const connection = await connectionPool.getConnection();
    const repository = connection.getRepository(Author);
    return repository.save(author);
  }
}
