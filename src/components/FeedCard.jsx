import React, { useState, useEffect } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import { FaHeart, FaRetweet } from 'react-icons/fa';
import defaultProfile from '../assets/profile_pic.png';

const FeedCard = ({ profileImage, username, handle, content, timestamp, gender }) => {
  const [avatar, setAvatar] = useState(profileImage || defaultProfile);

  useEffect(() => {
    // Replace default profile image if not provided
    if (!profileImage || profileImage === 'default.jpg') {
      if (gender?.toLowerCase() === 'female') {
        setAvatar('https://avatar.iran.liara.run/public/girl');
      } else if (gender?.toLowerCase() === 'male') {
        setAvatar('https://avatar.iran.liara.run/public/boy');
      } else {
        setAvatar('https://avatar.iran.liara.run/public'); // Fallback to random avatar
      }
    }
  }, [profileImage, gender]);

  return (
    <Card className="my-3" style={{ borderRadius: '10px' }}>
      <Card.Body className="d-flex">
        <Image
          src={avatar}
          roundedCircle
          style={{ width: '50px', height: '50px', marginRight: '15px' }}
          alt={`${username}'s avatar`}
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
