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
  const [courseDuration, setCourseDuration] = useState(editingFeedback?.courseDuration || '');
  const [feedbackComments, setFeedbackComments] = useState(editingFeedback?.feedbackComments || '');
  const [feedbackRating, setFeedbackRating] = useState(editingFeedback?.feedbackRating || 1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (editingFeedback) {
      setCourseId(editingFeedback.courseId);
      setCourseName(editingFeedback.courseName);
      setCourseDuration(editingFeedback.courseDuration);
      setFeedbackComments(editingFeedback.feedbackComments);
      setFeedbackRating(editingFeedback.feedbackRating);
    }
  }, [editingFeedback]);

  const resetForm = () => {
    setCourseName('');
    setCourseDuration('');
    setFeedbackComments('');
    setFeedbackRating(1);
    setCourseId('');
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courseName || !feedbackComments || !feedbackRating) {
      setError('Please complete all required fields');
      setSuccess('');
      return;
    }

    const payload = {
      courseName,
      courseDuration: courseDuration || 'Not specified',
      feedbackComments,
      feedbackRating,
    };

    try {
      if (editingFeedback) {
        await axios.put(`http://localhost:5000/api/feedbacks/${editingFeedback._id}`, payload);
        setSuccess('Feedback updated successfully. Redirecting...');
      } else {
        await axios.post('http://localhost:5000/api/feedbacks', payload);
        setSuccess('Feedback added successfully. Redirecting...');
      }
      setError('');
      setTimeout(() => {
        navigate('/');
      }, 900);
    } catch (err) {
      setError('Unable to save feedback. Please try again.');
      setSuccess('');
    }
  };

  return (
    <Card className="p-4 shadow-sm">
      <h2>{editingFeedback ? 'Edit Feedback' : 'Add Feedback'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
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

        <Form.Group className="mb-3" controlId="courseDuration">
          <Form.Label>Course Duration</Form.Label>
          <Form.Control
            type="text"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            placeholder="Enter duration (e.g., 4 weeks)"
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
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
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
