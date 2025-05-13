const express = require('express');
const router = express.Router();

const { createReview, getReviews } = require('../controller/reviewController');

router.post('/reviews', createReview);
router.get('/reviews', getReviews);

module.exports = router;
