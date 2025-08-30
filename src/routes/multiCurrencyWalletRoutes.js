const express = require('express');
const router = express.Router();
const walletController = require('../controllers/multiCurrencyWalletController');
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', walletController.getWallets);
router.post('/create', walletController.createWallet);
router.post('/convert', walletController.convertCurrency);

module.exports = router;
