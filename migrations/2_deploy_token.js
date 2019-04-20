const FTT = artifacts.require('FTT');

module.exports = async function(deployer) {
  await deployer.deploy(FTT);
};
