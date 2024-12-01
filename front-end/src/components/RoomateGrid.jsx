import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RoommateCard from './RoommateCard';
import DataService from '../api/DataService';

const sampleRoommates = [
  {
    profileImage: 'https://via.placeholder.com/100', // Replace with actual image URLs
    name: 'Sarah Jose',
    age: '24',
    gender: 'F',
    course: 'Computer Science',
    bio: 'Hi! I’m Sarah, a computer science graduate student at Stevens. I love spending my weekends exploring hiking trails and cooking new recipes. I’m an early riser and prefer a quiet space during study hours.',
  },
  {
    profileImage: 'https://via.placeholder.com/100',
    name: 'Jacob Peterson',
    age: '23',
    gender: 'M',
    course: 'Computer Science',
    bio: 'Hi! I’m Jacob, a first-year CS master’s student. I’m from California and love hiking, coding, and exploring new restaurants. Looking for a tidy, easy-going roommate who enjoys game nights and spontaneous coffee runs!',
  },
  {
    profileImage: 'https://via.placeholder.com/100',
    name: 'Arjun Rao',
    age: '24',
    gender: 'M',
    course: 'Computer Science',
    bio: 'Hey! I’m Arjun, originally from Bangalore, India. I’m into machine learning, playing soccer, and binge-watching sci-fi shows. I value cleanliness and love cooking, so if you’re a foodie, we’ll get along well.',
  },
  {
    profileImage: 'https://via.placeholder.com/100',
    name: 'Emily Nguyen',
    age: '24',
    gender: 'F',
    course: 'Computer Science',
    bio: 'Hey, I’m Emily from Texas! I’m passionate about web development and design. I enjoy quiet nights in with a good book or Netflix, but I’m also down for weekend trips. Looking for someone friendly and respectful.',
  },
  {
    profileImage: 'https://via.placeholder.com/100',
    name: 'Ryan Chen',
    age: '25',
    gender: 'M',
    course: 'Computer Science',
    bio: 'I’m Ryan from Taiwan, and I’m currently focusing on AI. I enjoy both peaceful study times and coding projects in my free time.',
  },
  {
    profileImage: 'https://via.placeholder.com/100',
    name: 'Miguel Fernand',
    age: '24',
    gender: 'M',
    course: 'Computer Science',
    bio: 'Hi! I’m Miguel from Madrid, Spain. I’m specializing in cybersecurity, and I love working out, traveling, and playing games.',
  },
  {
    profileImage: 'https://via.placeholder.com/100',
    name: 'Ryan Chen',
    age: '25',
    gender: 'M',
    course: 'Computer Science',
    bio: 'I’m Ryan from Taiwan, and I’m currently focusing on AI. I enjoy both peaceful study times and coding projects in my free time.',
  },
  {
    profileImage: 'https://via.placeholder.com/100',
    name: 'Miguel Fernand',
    age: '24',
    gender: 'M',
    course: 'Computer Science',
    bio: 'Hi! I’m Miguel from Madrid, Spain. I’m specializing in cybersecurity, and I love working out, traveling, and playing games.',
  },
];

const RoommateGrid = () => {

  const [roomates, setRoomates] = useState(null)

  useEffect(()=>{
    const fetchProfiles = async () => {
      try {
          const response = await DataService.getAllRoomates();
          setRoomates(response.data);
      } catch (error) {
          console.error('Failed to fetch profile:', error);
      } 
  };

      fetchProfiles();
  }, [])

  
  // const sampleRoommates = 

  return (
    <Container>
      <h4 className="my-4">56 Roommates Found!</h4>
      <Row>
        {sampleRoommates.map((roommate, index) => (
          <Col key={index} md={6} lg={6}>
            <RoommateCard
              profileImage={roommate.profileImage}
              name={roommate.name}
              age={roommate.age}
              gender={roommate.gender}
              course={roommate.course}
              bio={roommate.bio}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RoommateGrid;
