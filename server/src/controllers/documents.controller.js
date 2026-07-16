const documents = require('../data/documents');

function getAllDocuments(req, res) {
  res.json({
    success: true,
    data: documents,
  });
}

function getDocumentsByAssetId(req, res) {
  const { assetId } = req.params;
  const entry = documents.find((d) => d.assetId === assetId);

  if (!entry) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'DOCUMENTS_NOT_FOUND',
        message: 'No document metadata found for this asset',
      },
    });
  }

  res.json({
    success: true,
    data: entry,
  });
}

module.exports = { getAllDocuments, getDocumentsByAssetId };
