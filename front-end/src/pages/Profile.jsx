import React, { useState, useEffect } from 'react';
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
                setProfile(response.data); // Fetch and set the profile data
            } catch (error) {
                console.log(error)
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
        return <p><Link to='/login'>Login</Link> to see profile suggestions</p>; // Handle the case where data is unavailable
    }

    console.log('Profile Data:', profile);

    const getRandomBio = () => {
        const placeholderBios = [
            "I am a passionate learner and always excited about new opportunities.",
            "I enjoy exploring new technologies and collaborating with others.",
            "A Masters student with a keen interest in programming and travel.",
            "Lifelong learner with a love for coding and meaningful projects.",
            "Tech enthusiast who loves reading, traveling, and making new friends.",
        ];
        return placeholderBios[Math.floor(Math.random() * placeholderBios.length)];
    };

    const leftContent = (
        <Card className="p-3 text-center">
            <Image 
                src={profile.photo || "https://via.placeholder.com/150"} // Display profile.photo or fallback placeholder
                roundedCircle 
                alt={profile.photo ? `${profile.firstName} ${profile.lastName}'s profile picture` : "Default profile picture"}
                style={{ width: '120px', height: '120px', objectFit: 'cover', margin: '0 auto 15px' }} // Resize and center the image
            />
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
                {profile.bio || getRandomBio()}
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
