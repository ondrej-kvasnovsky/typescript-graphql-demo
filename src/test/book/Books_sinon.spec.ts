import {createSandbox, createStubInstance, SinonSandbox, stub} from 'sinon';
import * as typeorm from 'typeorm';
import Books from '../../app/book/Books';
import {expect} from '../config';

describe('Books', () => {

  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    if (sandbox) {
      sandbox.restore();
    }
  });

  it('finds all books', async () => {
    const connection = createStubInstance(typeorm.Connection);
    const manager = sandbox.createStubInstance(typeorm.EntityManager);
    connection.transaction.returns(manager);
    stub(typeorm, 'getConnection').returns(connection as any);
    const repository = createStubInstance(typeorm.Repository);
    stub(connection, 'getRepository').returns(repository)

    const books = new Books(connection as any);

    const allBooks = await books.findAll();

    expect(allBooks.length).to.eql(2);
  });
});
