import {expect} from '../config';

import Books from '../../app/book/Books';
import {container} from '../../app/di/inversify.config';
import {TYPES} from '../../app/di/types';

describe('Books', () => {

  let books: Books;

  beforeEach(() => {
    books = container.get(TYPES.Books);
  });

  it('returns apollo config with mutation, query and type definitions', async () => {
    // TODO: cleanup DB and insert two books
    const allBooks = await books.findAll();

    expect(allBooks.length).to.eql(2);
  });
});
