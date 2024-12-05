import React, { useState } from 'react';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../api/AuthService.js';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    bio: '',
    dateOfBirth: '',
    educationMajor: '',
    locationPreference: '',
    gender: '',
    smoking: '',
    dietaryPreferences: '',
    password: '',
    passwordConfirm: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.dateOfBirth || !formData.locationPreference || !formData.educationMajor) {
      setError('Please fill out all required fields.');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setError('');
      await AuthService.signup(formData);
      navigate('/login');
    } catch (error) {
      // alert()
      console.error('Signup failed:', error);
      setError('Signup failed. Please try again.');
      alert(error)
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '28rem', padding: '20px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Signup</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                placeholder="Tell us about yourself"
                value={formData.bio}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="educationMajor">
              <Form.Label>Education Major</Form.Label>
              <Form.Control
                type="text"
                name="educationMajor"
                placeholder="Enter your education major"
                value={formData.educationMajor}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="locationPreference">
              <Form.Label>Location Preference</Form.Label>
              <Form.Control
                type="text"
                name="locationPreference"
                placeholder="Enter your location preference"
                value={formData.locationPreference}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="gender">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Male"
                  name="gender"
                  type="radio"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="gender"
                  type="radio"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Non-Binary"
                  name="gender"
                  type="radio"
                  value="non-binary"
                  checked={formData.gender === 'non-binary'}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="smoking">
              <Form.Label>Smoking Preference</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Yes"
                  name="smoking"
                  type="radio"
                  value="true"
                  checked={formData.smoking === 'true'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="No"
                  name="smoking"
                  type="radio"
                  value="false"
                  checked={formData.smoking === 'false'}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="passwordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirm"
                placeholder="Confirm your password"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
