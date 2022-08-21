// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    // retrieves the accounts from local test network
    accounts = await web3.eth.getAccounts();

    // deploys the Inbox contract
    inbox = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: ['First message ever :D']
        })
        .send({
            from: accounts[0],
            gas: 1_000_000
        });

});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox._address);
    })
    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'First message ever :D');
    });
    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
});
