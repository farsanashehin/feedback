import { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AddFeedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingFeedback = location.state?.feedback || null;

  const [courseId, setCourseId] = useState(editingFeedback?.courseId || '');
  const [courseName, setCourseName] = useState(editingFeedback?.courseName || '');
  const [feedbackComments, setFeedbackComments] = useState(editingFeedback?.feedbackComments || '');
  const [feedbackRating, setFeedbackRating] = useState(editingFeedback?.feedbackRating || 1);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingFeedback) {
      setCourseId(editingFeedback.courseId);
      setCourseName(editingFeedback.courseName);
      setFeedbackComments(editingFeedback.feedbackComments);
      setFeedbackRating(editingFeedback.feedbackRating);
    }
  }, [editingFeedback]);

  const resetForm = () => {
    setCourseName('');
    setFeedbackComments('');
    setFeedbackRating(1);
    setCourseId('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName || !feedbackComments || !feedbackRating) {
      setError('Please complete all required fields');
      return;
    }

    const payload = {
      courseName,
      feedbackComments,
      feedbackRating,
    };

    try {
      if (editingFeedback) {
        await axios.put(`http://localhost:5000/api/feedbacks/${editingFeedback._id}`, payload);
      } else {
        await axios.post('http://localhost:5000/api/feedbacks', payload);
      }
      setError('');
      setTimeout(() => {
        navigate('/');
      }, 900);
    } catch (err) {
      setError('Unable to save feedback. Please try again.');
    }
  };

  return (
    <Card className="p-4 shadow-sm">
      <h2>{editingFeedback ? 'Edit Feedback' : 'Add Feedback'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="courseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="feedbackComments">
          <Form.Label>Feedback Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={feedbackComments}
            onChange={(e) => setFeedbackComments(e.target.value)}
            placeholder="Write your feedback"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="feedbackRating">
          <Form.Label>Feedback Rating</Form.Label>
          <Form.Select
            value={feedbackRating}
            onChange={(e) => setFeedbackRating(Number(e.target.value))}
            required
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Form.Select>
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="primary">
            {editingFeedback ? 'Update Feedback' : 'Submit Feedback'}
          </Button>
          <Button variant="secondary" onClick={() => {
            resetForm();
            navigate('/');
          }}>
            Cancel
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default AddFeedback;
