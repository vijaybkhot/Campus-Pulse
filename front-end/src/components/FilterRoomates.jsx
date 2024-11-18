import React from "react";
import { Form, Row, Col } from 'react-bootstrap';

const FilterRoomates = () => {
    return (
      <div className="p-3 pt-5" style={{ backgroundColor: '#f2f2f2', height: '100vh' }}>
        {/* Gender Preference */}
        <Form.Group className="mb-4">
          <Form.Label style={{ fontWeight: 'bold', color: '#8B0000' }}>Gender Preference</Form.Label>
          <div>
            <Form.Check type="checkbox" label="Male" />
            <Form.Check type="checkbox" label="Female" />
            <Form.Check type="checkbox" label="Trans-gender" />
            <Form.Check type="checkbox" label="Prefer to leave this blank" />
          </div>
        </Form.Group>
  
        {/* Education */}
        <Form.Group className="mb-4">
          <Form.Label style={{ fontWeight: 'bold', color: '#8B0000' }}>Education</Form.Label>
          <Form.Select>
            <option>Masters - Computer Science</option>
            <option>Bachelors - Engineering</option>
            <option>PhD - Data Science</option>
            <option>Other</option>
          </Form.Select>
        </Form.Group>
  
        {/* Smoking */}
        <Form.Group className="mb-4">
          <Form.Label style={{ fontWeight: 'bold', color: '#8B0000' }}>Smoking</Form.Label>
          <div className="d-flex align-items-center">
            <Form.Check type="radio" label="No" name="smoking" className="me-2" />
            <Form.Check type="radio" label="Yes" name="smoking" />
          </div>
        </Form.Group>
  
        {/* Food Preference */}
        <Form.Group className="mb-4">
          <Form.Label style={{ fontWeight: 'bold', color: '#8B0000' }}>Food Preference</Form.Label>
          <div>
            <Form.Check type="checkbox" label="Vegetarian" />
            <Form.Check type="checkbox" label="Non-Vegetarian" />
            <Form.Check type="checkbox" label="Vegan" />
          </div>
        </Form.Group>
  
        {/* Country of Origin */}
        <Form.Group className="mb-4">
          <Form.Label style={{ fontWeight: 'bold', color: '#8B0000' }}>Country of Origin</Form.Label>
          <Form.Select>
            <option>Flexible</option>
            <option>United States</option>
            <option>India</option>
            <option>Canada</option>
            <option>Other</option>
          </Form.Select>
        </Form.Group>
      </div>
    );
  };
  
  export default FilterRoomates;