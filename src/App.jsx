import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from './components/ProfileCard.jsx';
import { profiles } from './data/profiles.js';
import { useState } from 'react'; // importing useState
import Form from 'react-bootstrap/Form';   // importing Form
import Button from 'react-bootstrap/Button'; // importing Button

export default function App() {

  const [people, setPeople] = useState(profiles); // storing profiles in State
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleLike = (id) => {
      setPeople(ps => ps.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));  // incrementing profiles likes
    }; 


  const clickSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const trimmed = name.trim();
    
    // Check if name is empty
    if (trimmed === '') {
      setError('Name is required');
      return;
    }
    
    // Check if name already exists (case-insensitive)
    const exists = people.some(p => p.name.toLowerCase() === trimmed.toLowerCase());
    if (exists) {
      setError('Name already exists');
      return;
    }
    
    // Add new profile
    const newProfile = {
      id: Date.now(), // Simple unique ID
      name: trimmed,
      likes: 0
    };
    
    setPeople([...people, newProfile]);
    setName(''); // Clear input
    setError(''); // Clear error
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError(''); // Clear error when user starts typing
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>

      {/* Add Profile Form */}
      <Form onSubmit={clickSubmit} className="mb-4">
        <Row className="align-items-end">
          <Col xs={12} md={8}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={handleNameChange}
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Button type="submit" variant="primary" className="w-100">
              Add Profile
            </Button>
          </Col>
        </Row>
      </Form>

      <Row xs={1} md={2} lg={3}>
        {people.map(p => (
          <Col key={p.id}>
            <ProfileCard name={p.name} likes={p.likes} onLike={() => handleLike(p.id)} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}