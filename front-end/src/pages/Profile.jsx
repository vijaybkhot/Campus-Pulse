import React, {useState, useEffect} from 'react';
import ThreeColLayout from '../layouts/ThreeColLayout'; 
import { Card, ListGroup, Image, Button } from 'react-bootstrap';
import DataService from '../api/DataService';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const response = await DataService.getUserProfile();
            setProfile(response.data);
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setLoading(false);
        }
    };

        fetchProfile();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Display a loading state while fetching data
    }

    if (!profile) {
        return <p>Error loading profile. Please try again later.</p>; // Handle the case where data is unavailable
    }

    console.log('Profile print - ')
    console.log(profile)


    const leftContent = (
        <Card className="p-3">
            <Image src="https://via.placeholder.com/150" roundedCircle style={{ width: '100%', marginBottom: '15px' }} />
            <h4>{profile.firstName} {profile.lastName}</h4>
            <p>{profile.educationMajor}</p>
            <ListGroup variant="flush">
                <ListGroup.Item>Email: {profile.email}</ListGroup.Item>
                <ListGroup.Item>Location: {profile.locationPreference}</ListGroup.Item>
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
            <p>Phone: +1 {profile.phone}</p>
            {/* <p>LinkedIn: linkedin.com/in/johndoe</p> */}
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
