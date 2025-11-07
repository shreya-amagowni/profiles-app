import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileCard from './components/ProfileCard.jsx';
import { profiles } from './data/profiles.js';
import { useState } from 'react'; // importing useState

export default function App() {

  const [people, setPeople] = useState(profiles); // storing profiles in State

  const handleLike = (id) => {
      setPeople(ps => ps.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));  // incrementing profiles likes
    }; 

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>
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