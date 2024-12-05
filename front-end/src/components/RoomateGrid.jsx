import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RoommateCard from "./RoommateCard";
import DataService from "../api/DataService";
import defaultProfile from '../assets/profile_pic.png'


const RoommateGrid = ({ filters }) => {
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        console.log("Filters sent to backend:", filters); // Debugging
        const fetchedRoommates = await DataService.getAllRoommates(filters);
        setRoommates(fetchedRoommates); // Assuming response is an array of roommates
      } catch (err) {
        console.error("Failed to fetch profiles:", err);
        setError("Failed to load roommates. Please try again.");
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
              profileImage={defaultProfile}
              name={`${roommate.firstName} ${roommate.lastName}`}
              age={roommate.age}
              gender={roommate.gender}
              course={roommate.educationMajor}
              bio={roommate.bio}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RoommateGrid;
