import {Arg, Substitute} from '@fluffy-spoon/substitute';
import {Repository} from 'typeorm';
import Book from '../../app/book/Book';
import Books from '../../app/book/Books';
import ConnectionPool from '../../app/db/ConnectionPool';
import {expect} from '../config';

// https://github.com/ffMathy/FluffySpoon.JavaScript.Testing.Faking
describe('Books', () => {

  it('finds all books', async () => {
    const repositoryMock = Substitute.for<Repository<Book>>();
    repositoryMock.find()
      .returns(Promise.resolve([new Book()]));

    const connectionPoolMock = Substitute.for<ConnectionPool>();
    connectionPoolMock.getRepository(Arg.any())
      .returns(Promise.resolve(repositoryMock as any));

    const books = new Books(connectionPoolMock);

    const allBooks = await books.findAll();

    expect(allBooks.length).to.eql(1);
  });

  it('fails to create connection', async () => {
    const repositoryMock = Substitute.for<Repository<Book>>();
    repositoryMock.find()
      .returns(new Promise(() => {
        throw new Error();
      }));

    const connectionPoolMock = Substitute.for<ConnectionPool>();
    connectionPoolMock.getRepository(Arg.any())
      .returns(Promise.resolve(repositoryMock as any));

    const books = new Books(connectionPoolMock);

    await expect(books.findAll()).to.be.rejectedWith(Error);
  });
});
