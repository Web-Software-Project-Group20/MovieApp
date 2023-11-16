const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const jwt = require('../auth/auth.js');
const reviewController = require('../controllers/reviewController.js');

router.get('/', upload.none(), jwt.auth, reviewController.getReview);
router.post('/', upload.none(), reviewController.createReview);
router.delete('/', upload.none(), reviewController.deleteReview);

module.exports = router;
