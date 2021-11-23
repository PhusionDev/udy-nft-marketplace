const { assert } = require('chai');

const KryptoBird = artifacts.require('./KryptoBird');

// check for chai
require('chai')
  .use(require('chai-as-promised'))
  .should();

contract('KryptoBird', (accounts) => {
  let contract;

  // testing container - describe
  describe('deployment', async () => {
    // test samples with writing it
    it('deploys successfully', async () => {
      contract = await KryptoBird.deployed();
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
});
