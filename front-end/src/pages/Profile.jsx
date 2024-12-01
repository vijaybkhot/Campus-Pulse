import React from 'react';
import ThreeColLayout from '../layouts/ThreeColLayout'; 
import { Card, ListGroup, Image, Button } from 'react-bootstrap';
import DataService from '../api/DataService';

const ProfilePage = async () => {
    const profile = await DataService.getUserProfile()
    const leftContent = (
        <Card className="p-3">
            <Image src="https://via.placeholder.com/150" roundedCircle style={{ width: '100%', marginBottom: '15px' }} />
            <h4>`${profile.firstName} ${profile.lastName}`</h4>
            <p>Software Engineer, Tech Enthusiast</p>
            <ListGroup variant="flush">
                <ListGroup.Item>Email: john.doe@example.com</ListGroup.Item>
                <ListGroup.Item>Location: New York, USA</ListGroup.Item>
                <ListGroup.Item>Joined: January 2022</ListGroup.Item>
            </ListGroup>
        </Card>
    );

    const centerContent = (
        <div className="p-3 mt-5">
            <h2>About Me</h2>
            <p className='mt-3'>
                I am a Masters in Computer Science student with a passion for web development. I am from Delhi, India. I am an easy to go person. I enjoy
                reading, learning new technologies, traveling, and collaborating with others to create something meaninful.
            </p>
        </div>
    );

    const rightContent = (
        <Card className="p-3">
            <h4>Quick Actions</h4>
            <Button variant="primary" className="w-100 mb-2">Send Message</Button>
            <Button variant="secondary" className="w-100">Add to Contacts</Button>
            <hr />
            <h4>Contact Info</h4>
            <p>Phone: +1 (555) 123-4567</p>
            <p>LinkedIn: linkedin.com/in/johndoe</p>
        </Card>
    );

    return (
        <ThreeColLayout 
            leftContent={leftContent}
            centerContent={centerContent}
            rightContent={rightContent}
        />
    );
};

export default ProfilePage;
