import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { FaCommentDots } from 'react-icons/fa';

const RoommateCard = ({ profileImage, name, age, gender, course, bio }) => {
  return (
    <Card className='my-2' style={{ borderRadius: '15px', padding: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', backgroundColor:'#F4F4F4' }}>
      <div className="d-flex">
        <Image
          src={profileImage}
          roundedCircle
          style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '15px' }}
        />
        <div style={{ flex: 1 }}>
          <Card.Title style={{ fontSize: '24px', color: '#8B0000', fontWeight: 'bold' }}>{name}</Card.Title>
          <Card.Text style={{ fontSize: '14px', marginBottom: '10px' }}>
            <div>Age: {age}</div>
            <div>Gender: {gender}</div>
            <div>Course: {course}</div>
          </Card.Text>
          <FaCommentDots size={24} style={{ position: 'absolute', top: '15px', right: '15px', color: '#8B0000' }} />
        </div>
      </div>
      <Card.Body className="mt-3" style={{ fontSize: '14px', lineHeight: '1.5' }}>
        <strong>Bio:</strong> {bio}
      </Card.Body>
    </Card>
  );
};

export default RoommateCard;
