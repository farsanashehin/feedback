const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  courseDuration: { type: String, default: 'Not specified' },
  feedbackComments: { type: String, required: true },
  feedbackRating: { type: Number, required: true, min: 1, max: 5 },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
