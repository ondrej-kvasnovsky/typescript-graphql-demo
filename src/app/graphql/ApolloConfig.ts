import {gql} from 'apollo-server-express';

import fs from 'fs';
import {DocumentNode} from 'graphql';

import {promisify} from 'util';

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
        createBook: (parent: any, args: any) => {
          return {name: args.name};
        },
      },
      Query: {
        getAuthors: () => [{firstName: 'Miki'}],
        getBooks: () => [{name: 'Bunnies are the best'}],
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
