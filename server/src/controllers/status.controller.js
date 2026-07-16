const packageJson = require('../../package.json');

const STATUS_DATA = {
  protocol: 'VaultX',
  version: packageJson.version || '1.0.0',
  status: 'operational',
  network: {
    chainId: 1337,
    name: 'Ethereum Local (Ganache)',
    currency: 'ETH',
  },
  contracts: {
    VaultXToken: { deployed: true, verified: false },
    VaultXPresale: { deployed: true, verified: false },
    VaultXTreasuryLedger: { deployed: true, verified: false },
    VaultXDocumentAnchor: { deployed: true, verified: false },
  },
  uptime: process.uptime(),
  timestamp: new Date().toISOString(),
};

function getStatus(req, res) {
  res.json({
    success: true,
    data: STATUS_DATA,
  });
}

module.exports = { getStatus };
