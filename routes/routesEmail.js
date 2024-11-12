const express = require('express')
const router = express.Router();
const MailController = require('../controllers/mailController')

router.post('/mailMasive', MailController.sednMasiveEmail);

module.exports = router;