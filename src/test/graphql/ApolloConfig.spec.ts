import {container} from '../../app/di/inversify.config';
import {TYPES} from '../../app/di/types';
import {ApolloConfig} from '../../app/graphql/ApolloConfig';
import {expect} from '../config';

describe('ApolloConfig', () => {

  let apolloServer: ApolloConfig;

  beforeEach(() => {
    apolloServer = container.get(TYPES.ApolloConfig);
  });

  it('returns apollo config with mutation, query and type definitions', async () => {
    const apolloConfig = await apolloServer.getApolloConfig();

    expect(apolloConfig.resolvers.Mutation).to.not.eql(undefined);
    expect(apolloConfig.resolvers.Query).to.not.equal(undefined);
    expect(apolloConfig.typeDefs).to.not.eql(undefined);
  });
});
