const FTT = artifacts.require('FTT');

contract('FTT', async accounts => {
  let [owner, user1, user2] = accounts;
  let coin;
  beforeEach('deploy contract', async () => {
    coin = await FTT.new();
  });

  async function getBalance(account) {
    return await coin.balanceOf(account);
  }

  it('should initalize owner balance', async () => {
    assert.equal(await getBalance(owner), 3.5e26);
    assert.equal(await getBalance(user1), 0);
    assert.equal(await getBalance(user2), 0);
    assert.equal(await coin.totalSupply(), 3.5e26);
  });

  it('should be transferable', async () => {
    assert.equal(await getBalance(owner), 3.5e26);
    assert.equal(await getBalance(user1), 0);
    assert.equal(await getBalance(user2), 0);

    await coin.transfer(user1, 123, {from: owner});

    assert.equal(await getBalance(user1), 123);
    assert.equal(await getBalance(user2), 0);
    assert.equal(await coin.totalSupply(), 3.5e26);

    await coin.transfer(user2, 23, {from: user1});

    assert.equal(await getBalance(user1), 100);
    assert.equal(await getBalance(user2), 23);
    assert.equal(await coin.totalSupply(), 3.5e26);
  });

  it('should be burnable', async () => {
    assert.equal(await getBalance(owner), 3.5e26);
    assert.equal(await getBalance(user1), 0);

    await coin.transfer(user1, '100000000000000000000000000', {from: owner});

    assert.equal(await getBalance(user1), 1e26);
    assert.equal(await coin.totalSupply(), 3.5e26);

    await coin.burn('50000000000000000000000000', {from: user1});

    assert.equal(await getBalance(user1), 5e25);
    assert.equal(await coin.totalSupply(), 3e26);
  });
});

async function assertRevert(promise) {
  try {
    await promise;
    throw null;
  } catch (error) {
    assert(error, 'did not revert');
    assert(
      error.message.startsWith('Returned error: VM Exception while processing transaction: revert'),
    );
  }
}
