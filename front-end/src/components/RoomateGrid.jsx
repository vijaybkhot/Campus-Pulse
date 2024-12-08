import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RoommateCard from "./RoommateCard";
import DataService from "../api/DataService";

const RoommateGrid = ({ filters }) => {
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAvatarUrl = (gender) => {
    if (gender?.toLowerCase() === "female") {
      return "/avatar_female.png"; // Path to female avatar in the public folder
    }
    if (gender?.toLowerCase() === "male") {
      return "/avatar_male.png"; // Path to male avatar in the public folder
    }
    return "/avatar_random.png"; // Path to random avatar
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const fetchedRoommates = await DataService.getAllRoommates(filters);

        // Update roommates to use local avatar paths if no photo is provided
        const updatedRoommates = fetchedRoommates.map((roommate) => ({
          ...roommate,
          photo: roommate.photo || getAvatarUrl(roommate.gender),
        }));

        setRoommates(updatedRoommates);
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
        setError("Please Login or Signup to find roommates!");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [filters]);

  if (loading) return <p>Loading roommates...</p>;
  if (error) return <p>{error}</p>;

  if (!roommates || roommates.length === 0) {
    return <p>No roommates found matching your criteria.</p>;
  }

  return (
    <Container>
      <h4 className="my-4">{roommates.length} Roommates Found!</h4>
      <Row>
        {roommates.map((roommate) => (
          <Col key={roommate._id} md={6} lg={6}>
            <RoommateCard
              profileImage={roommate.photo} // Pass the updated photo or fallback avatar
              name={`${roommate.firstName} ${roommate.lastName}`}
              age={roommate.age}
              gender={roommate.gender}
              course={roommate.educationMajor}
              bio={roommate.bio}
              userId={roommate._id}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RoommateGrid;
