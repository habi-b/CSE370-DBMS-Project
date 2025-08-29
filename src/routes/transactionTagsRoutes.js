const express = require('express');
const router = express.Router();
const transactionTagsController = require('../controllers/transactionTagsController');
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', transactionTagsController.getTransactionsWithTags);
router.put('/:transactionId', transactionTagsController.updateTransactionTags);
router.get('/by-tag/:tag', transactionTagsController.getTransactionsByTag);
router.get('/all-tags', transactionTagsController.getAllTags);
router.delete('/delete-tag/:tag', transactionTagsController.deleteTag);

module.exports = router;
