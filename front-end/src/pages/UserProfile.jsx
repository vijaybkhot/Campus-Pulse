import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, ListGroup, Image, Button } from "react-bootstrap";
import DataService from "../api/DataService";
import defaultProfile from "../assets/profile_pic.png"; // Default profile image
import ThreeColLayout from "../layouts/ThreeColLayout"; // Import ThreeColLayout
import "./UserProfile.css"; // Optional CSS for styling

const UserProfile = () => {
  const { userId } = useParams(); // Extract userId from the route params
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(`Fetching user details for ID: ${userId}`);
        const response = await DataService.getUserById(userId); // Fetch user details
        console.log("Fetched User Data:", response.data); // Debugging API response
        setUser(response.data); // Only store the user data
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No user details found.</p>;

  // Left Content
  const leftContent = (
    <Card className="p-3">
      <Image
        src={user.photo || defaultProfile}
        roundedCircle
        alt={user.photo ? `${user.firstName} ${user.lastName}'s profile picture` : "Default profile picture"}
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          marginBottom: "15px",
        }}
      />
      <p><b>{user.firstName} {user.lastName || ""}</b></p>
      <p>{user.educationMajor || "Major: N/A"}</p>
      <ListGroup variant="flush">
        <ListGroup.Item>Email: {user.email || "N/A"}</ListGroup.Item>
        <ListGroup.Item>Location: {user.locationPreference || "N/A"}</ListGroup.Item>
      </ListGroup>
    </Card>
  );

  // Center Content
  const centerContent = (
    <div className="p-3 mt-3">
      <h2>About Me</h2>
      <p className="mt-3">{user.bio || "No bio available"}</p>
      <ListGroup variant="flush">
        <ListGroup.Item><strong>Age:</strong> {user.age || "N/A"}</ListGroup.Item>
        <ListGroup.Item><strong>Date of Birth:</strong> {new Date(user.dateOfBirth).toLocaleDateString('en-US') || "N/A"}</ListGroup.Item>
        <ListGroup.Item><strong>Gender:</strong> {user.gender || "N/A"}</ListGroup.Item>
        <ListGroup.Item><strong>Country of Origin:</strong> {user.countryOfOrigin || "N/A"}</ListGroup.Item>
        <ListGroup.Item><strong>Smoking:</strong> {user.smoking ? "Yes" : "No"}</ListGroup.Item>
        <ListGroup.Item><strong>Pets:</strong> {user.pets ? "Yes" : "No"}</ListGroup.Item>
        <ListGroup.Item><strong>Dietary Preferences:</strong> {user.dietaryPreferences || "N/A"}</ListGroup.Item>
        <ListGroup.Item><strong>Preferred Roommate Gender:</strong> {user.preferredRoommateGender || "N/A"}</ListGroup.Item>
      </ListGroup>
    </div>
  );

  // Right Content
  const rightContent = (
    <Card className="p-3">
      <h3>Quick Actions</h3>
      <Button variant="primary" className="w-100 mb-2">Send Message</Button>
      <Button variant="secondary" className="w-100">Add to Contacts</Button>
      <hr />
      <h4>Contact Info</h4>
      <p>Phone: {user.phone || "N/A"}</p>
    </Card>
  );

  return (
    <>
      <ThreeColLayout
        leftContent={leftContent}
        centerContent={centerContent}
        rightContent={rightContent}
      />
    </>
  );
};

export default UserProfile;
