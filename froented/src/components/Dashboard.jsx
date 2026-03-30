import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/feedbacks');
      setFeedbacks(response.data);
    } catch (err) {
      setError('Failed to fetch feedbacks');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/feedbacks/${id}`);
      setFeedbacks(feedbacks.filter(f => f._id !== id));
    } catch (err) {
      setError('Failed to delete feedback');
    }
  };

  const handleUpdate = (feedback) => {
    navigate('/add', { state: { feedback } });
  };

  return (
    <div>
      <h2>Feedback Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Course Duration</th>
            <th>Overall Feedback Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(feedback => (
            <tr key={feedback._id}>
              <td>{feedback.courseId}</td>
              <td>{feedback.courseName}</td>
              <td>{feedback.courseDuration}</td>
              <td>{feedback.feedbackRating}</td>
              <td>
                <Button variant="warning" onClick={() => handleUpdate(feedback)} className="me-2">Update</Button>
                <Button variant="danger" onClick={() => handleDelete(feedback._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Dashboard;