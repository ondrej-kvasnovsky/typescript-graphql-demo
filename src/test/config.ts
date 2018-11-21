import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSubset from 'chai-subset';
import 'mocha';
import sinonChai from 'sinon-chai';

console.log('Setting up tests!!');
chai.should();
chai.use(chaiAsPromised);
chai.use(chaiSubset);
chai.use(sinonChai);

const expect = chai.expect;
export {expect};
