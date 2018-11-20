import {expect} from 'chai';
import 'mocha';
import {ApolloConfig} from '../../app/graphql/ApolloConfig';

describe('ApolloConfig', () => {

  it('returns apollo config with mutation, query and type definitions', async () => {
    const config = new ApolloConfig();

    const apolloConfig = await config.getApolloConfig();

    expect(apolloConfig.resolvers.Mutation).to.not.eql(undefined);
    expect(apolloConfig.resolvers.Query).to.not.equal(undefined);
    expect(apolloConfig.typeDefs).to.not.eql(undefined);
  });
});
