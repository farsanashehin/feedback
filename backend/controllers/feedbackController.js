const Feedback = require('../models/feedback');

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new feedback
const createFeedback = async (req, res) => {
  const { courseName, feedbackComments, feedbackRating } = req.body;
  const courseId = `C${Date.now()}`;
  const feedback = new Feedback({ courseId, courseName, feedbackComments, feedbackRating });
  try {
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};