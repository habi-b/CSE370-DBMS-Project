const express = require('express');
const router = express.Router();
const beneficiaryController = require('../controllers/beneficiaryController');
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', beneficiaryController.getBeneficiaries);
router.post('/', beneficiaryController.addBeneficiary);
router.put('/:beneficiaryId', beneficiaryController.updateBeneficiary);
router.delete('/:beneficiaryId', beneficiaryController.deleteBeneficiary);

module.exports = router;
