import {gql} from 'apollo-server-express';

import fs from 'fs';
import {DocumentNode} from 'graphql';

import {inject, injectable} from 'inversify';
import {promisify} from 'util';
import Author from '../author/Author';
import Authors from '../author/Authors';
import Book from '../book/Book';
import Books from '../book/Books';
import {TYPES} from '../di/types';
import {Dialogflow} from '../speach/Dialogflow';

const readFile = promisify(fs.readFile);

@injectable()
export class ApolloConfig {

  private books: Books;
  private authors: Authors;
  private dialogflow: Dialogflow;

  constructor(@inject(TYPES.Books) books: Books,
              @inject(TYPES.Authors) authors: Authors,
              @inject(TYPES.Dialogflow) dialogflow: Dialogflow) {
    this.books = books;
    this.authors = authors;
    this.dialogflow = dialogflow;
  }

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
          return this.books.insert(book);
        },
        createAuthor: async (parent: any, args: any) => {
          const book = new Author();
          book.firstName = args.firstName;
          book.lastName = args.lastName;

          return this.authors.insert(book);
        },
      },
      Query: {
        getAuthors: async () => {
          return this.authors.findAll();
        },
        getBooks: async () => {
          return this.books.findAll();
        },
        ask: async (parent: any, args: any) => {
          const question = args.question;
          const answer = await this.dialogflow.ask(question);
          return answer;
        },
      },
    };
    return resolvers;
  }
}
