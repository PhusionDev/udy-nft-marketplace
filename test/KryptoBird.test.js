const { assert } = require('chai');

const KryptoBird = artifacts.require('./KryptoBird');

// check for chai
require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('KryptoBird', (accounts) => {
  let contract;

  // before tells our tests to run this first before anything else
  before(async () => {
    contract = await KryptoBird.deployed();
  });

  // testing container - describe
  describe('deployment', async () => {
    // test samples with writing it
    it('deploys successfully', async () => {
      const address = contract.address;

      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, 0x0);
    });

    it('has name KryptoBird', async () => {
      const tokenName = await contract.name();

      assert.equal(tokenName, 'KryptoBird');
    });

    it('has symbol KBIRDZ', async () => {
      const tokenSymbol = await contract.symbol();

      assert.equal(tokenSymbol, 'KBIRDZ');
    });
  });

  describe('minting', async () => {
    it('creates a new token', async () => {
      const result = await contract.mint('https...1');
      const totalSupply = await contract.totalSupply();

      // Success
      assert.equal(totalSupply, 1);
      const event = result.logs[0].args;
      assert.equal(
        event._from,
        0x0000000000000000000000000000000000000000,
        'to is msg.sender'
      );
      assert.equal(event._to, accounts[0], 'to is msg.sender');

      // Failure
      await contract.mint('https...1').should.be.rejected;
    });
  });

  describe('indexing', async () => {
    it('lists KryptoBirdz', async () => {
      // mint three new tokens
      await contract.mint('https...2');
      await contract.mint('https...3');
      await contract.mint('https...4');
      const totalSupply = await contract.totalSupply();

      // loop through list and grab KBIRDZ
      let result = [];
      let kb;
      for (let i = 0; i < totalSupply; i++) {
        kb = await contract.kryptoBirdz(i);
        result.push(kb);
      }

      // assert that our new array result will equal our expected result
      let expected = ['https...1', 'https...2', 'https...3', 'https...4'];
      assert.equal(result.join(','), expected.join(','));
    });
  });
});
