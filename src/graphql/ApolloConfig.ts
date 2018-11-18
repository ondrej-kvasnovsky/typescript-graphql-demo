import {gql} from 'apollo-server-express';

import fs from 'fs';
import {DocumentNode} from 'graphql';

const {promisify} = require('util');
const readFile = promisify(fs.readFile);

export class ApolloConfig {

  public async getApolloConfig() {
    const typeDefs = await this.getTypeDefs();
    const resolvers = this.getResolvers();
    return {typeDefs, resolvers};
  }

  private async loadSchema(): Promise<string> {
    return readFile('src/graphql/schema.graphql', {encoding: 'utf8'});
  }

  private async getTypeDefs(): Promise<DocumentNode> {
    const schema = await this.loadSchema();
    return gql(schema);
  }

  private getResolvers() {
    const resolvers = {
      Query: {
        getBooks: () => [{name: 'Bunnies are the best'}],
        getAuthors: () => [{firstName: 'Miki'}],
      },
      Mutation: {
        createBook: (parent: any, args: any) => {
          return {name: args.name};
        },
      },
    };
    return resolvers;
  }
}

// query {
//   getBooks {
//     name
//   }
//   getAuthors {
//     firstName
//   }
// }

// {
//   __type(name: "BlahBlah") {
//     name
//     description
//     fields {
//       name
//       type {
//         name
//       }
//     }
//   }
// }
