const VaultXDocumentAnchor = artifacts.require('VaultXDocumentAnchor');

module.exports = async function deploy(deployer, network, accounts) {
  await deployer.deploy(VaultXDocumentAnchor);
  const anchor = await VaultXDocumentAnchor.deployed();
  console.log('✅ VaultXDocumentAnchor deployed at:', anchor.address);
};
