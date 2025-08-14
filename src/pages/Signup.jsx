
import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate=useNavigate();
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const signupUser = async (name, email, password, getUser) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.error || 'Signup failed');
      return;
    }

    alert('Signup successful');
    navigate('/login'); // ✅ directly use navigate from useNavigate()

  } catch (err) {
    console.error('Signup error:', err);
    alert('Server error. Please try again later.');
  }
};




  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser(name, email, password);
  };

  return (
    <Container className="my-4">
      <h2> Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </Form.Group>

        <Button type="submit" variant="success">Signup</Button>
      </Form>
    </Container>
  );
};

export default Signup;
