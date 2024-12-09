import React, { useEffect, useState } from "react";
import { ListGroup, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DataService from "../api/DataService";

const ProfileListView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await DataService.getAllRoommates();
        setUsers(fetchedUsers.slice(0, 6)); // Limit to 6 users
      } catch (err) {
        console.error("Failed to load user profiles:", err);
        setError("Please Login or Signup to see friend suggestions");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <p>Loading friends...</p>;
  if (error) return <p>{error}</p>;

  if (!users || users.length === 0) {
    return <p>No friends found at the moment. Please check back later.</p>;
  }

  return (
    <>
      <div className="mt-5">
        <h3 className="color-red">Find New Friends</h3>
      </div>
      <ListGroup variant="flush">
        {users.map((user) => (
          <ListGroup.Item
            key={user._id}
            className="d-flex align-items-center"
            onClick={() => navigate(`/profile/${user._id}`)} // Navigate to user's profile
            style={{ cursor: "pointer" }}
          >
            <Image
              src={user.photo ? user.photo : "https://via.placeholder.com/150"} // Use user's photo or placeholder
              roundedCircle
              style={{ width: "60px", height: "60px", marginRight: "15px", objectFit: "cover" }}
              alt={`${user.firstName} ${user.lastName} image`}
            />
            <div>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                {user.firstName} {user.lastName}
              </div>
              <div style={{ fontSize: "12px" }}>
                {user.bio || "2nd year Masters Student"}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default ProfileListView;
