import {expect} from '../config';

import * as TypeMoq from 'typemoq';
import {Repository} from 'typeorm';
import Book from '../../app/book/Book';
import Books from '../../app/book/Books';
import ConnectionPool from '../../app/db/ConnectionPool';

describe('Books', () => {

  let connectionPoolMock: TypeMoq.IMock<ConnectionPool>;

  beforeEach(() => {
    connectionPoolMock = TypeMoq.Mock.ofType<ConnectionPool>();
  });

  // TODO: does not work... is waiting for promise resolve
  it('finds books', async () => {
    const repositoryMock = TypeMoq.Mock.ofType<Repository<Book>>();
    repositoryMock
      .setup((repo) => repo.find())
      .returns(() => new Promise(() => [new Book()]));
    connectionPoolMock
      .setup((pool) => pool.getRepository(Book))
      .returns(() => new Promise(() => repositoryMock.object));

    const books = new Books(connectionPoolMock.object);

    const allBooks = await books.findAll();

    expect(allBooks.length).to.eql(2);
  });
});
