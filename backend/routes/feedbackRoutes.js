const express = require('express');
const router = express.Router();
const {
  getFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} = require('../controllers/feedbackController');

router.get('/', getFeedbacks);
router.post('/', createFeedback);
router.put('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);

module.exports = router;
