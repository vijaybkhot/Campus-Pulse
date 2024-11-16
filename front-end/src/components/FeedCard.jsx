import React from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import { FaHeart, FaRetweet, FaComment } from 'react-icons/fa';
import defaultProfile from '../assets/profile_pic.png'

const FeedCard = ({ profileImage, username, handle, content, timestamp }) => {
  return (
    <Card className="my-3" style={{ borderRadius: '10px' }}>
      <Card.Body className="d-flex">
        <Image
          src={defaultProfile}
          roundedCircle
          style={{ width: '50px', height: '50px', marginRight: '15px' }}
        />
        <div style={{ flex: 1 }}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{username}</strong> <span className="text-muted">MS CS - 2nd Year</span>
            </div>
            <small className="text-muted">{timestamp}</small>
          </div>
          <Card.Text className="mt-2">{content}</Card.Text>
          <div className="d-flex justify-content-around mt-3">
            <Button variant="link" className="text-dark remove-underline">
              <FaHeart /> <small>Like</small>
            </Button>
            <Button variant="link" className="text-dark remove-underline">
              <FaRetweet /> <small>Share</small>
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FeedCard;
