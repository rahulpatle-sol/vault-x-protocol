const VaultXTreasuryLedger = artifacts.require('VaultXTreasuryLedger');

module.exports = async function deploy(deployer, network, accounts) {
  await deployer.deploy(VaultXTreasuryLedger);
  const ledger = await VaultXTreasuryLedger.deployed();
  console.log('✅ VaultXTreasuryLedger deployed at:', ledger.address);
};
