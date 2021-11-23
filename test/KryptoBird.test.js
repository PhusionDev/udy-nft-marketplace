const assert = require('chai');
const _deploy_contracts = require('../migrations/2_deploy_contracts');

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
    });
  });
});
