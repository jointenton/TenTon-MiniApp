const express = require('express');
const { registerOrganization, getAllOrganizations } = require('../controllers/orgController');
const router = express.Router();

router.post('/signup', registerOrganization);
router.get('/', getAllOrganizations);

module.exports = router;
