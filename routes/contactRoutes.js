const express = require('express');
const router = express.Router();

const { createContact, getContacts } = require('../controller/contactController');

router.post('/contact', createContact);
router.get('/contact', getContacts);

module.exports = router;