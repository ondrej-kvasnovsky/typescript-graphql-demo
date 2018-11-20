import {gql} from 'apollo-server-express';

import fs from 'fs';
import {DocumentNode} from 'graphql';

import {promisify} from 'util';
import Author from '../author/Author';
import {Authors} from '../author/Authors';
import Book from '../book/Book';
import {Books} from '../book/Books';

const books: Books = new Books();
const authors: Authors = new Authors();

const readFile = promisify(fs.readFile);

export class ApolloConfig {

  public async getApolloConfig() {
    const typeDefs = await this.getTypeDefs();
    const resolvers = this.getResolvers();
    return {typeDefs, resolvers};
  }

  private async loadSchema(): Promise<string> {
    return readFile('src/app/graphql/schema.graphql', {encoding: 'utf8'});
  }

  private async getTypeDefs(): Promise<DocumentNode> {
    const schema = await this.loadSchema();
    return gql(schema);
  }

  private getResolvers() {
    const resolvers = {
      Mutation: {
        createBook: async (parent: any, args: any) => {
          const book = new Book();
          book.name = args.name;
          return books.insert(book);
        },
        createAuthor: async (parent: any, args: any) => {
          const book = new Author();
          book.firstName = args.firstName;
          book.lastName = args.lastName;

          return authors.insert(book);
        },
      },
      Query: {
        getAuthors: async () => {
          return authors.findAll();
        },
        getBooks: async () => {
          return books.findAll();
        },
      },
    };
    return resolvers;
  }
}
