const { Router } = require('express');
const { getAllDocuments, getDocumentsByAssetId } = require('../controllers/documents.controller');

const router = Router();

router.get('/', getAllDocuments);
router.get('/:assetId', getDocumentsByAssetId);

module.exports = router;
