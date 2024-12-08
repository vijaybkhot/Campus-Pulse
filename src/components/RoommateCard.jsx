import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { FaCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RoommateCard = ({ profileImage, name, age, gender, course, bio, userId }) => {
  const [avatar, setAvatar] = useState(profileImage);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/profile/${userId}`);
  };

  useEffect(() => {
    // Replace "default.jpg" with fallback avatar logic
    if (profileImage === "default.jpg" || !profileImage) {
      if (gender?.toLowerCase() === "female") {
        setAvatar("https://avatar.iran.liara.run/public/girl");
      } else if (gender?.toLowerCase() === "male") {
        setAvatar("https://avatar.iran.liara.run/public/boy");
      } else {
        setAvatar("https://avatar.iran.liara.run/public"); // Fallback to random avatar
      }
    }
  }, [profileImage, gender]);

  return (
    <Card
      className="my-2"
      style={{
        borderRadius: "15px",
        padding: "15px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#F4F4F4",
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <div className="d-flex">
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "50%",
            marginRight: "15px",
            border: "2px solid #8B0000",
          }}
        />
        <div style={{ flex: 1 }}>
          <Card.Title
            style={{
              fontSize: "20px",
              color: "#8B0000",
              fontWeight: "bold",
            }}
          >
            {name}
          </Card.Title>
          <Card.Text style={{ fontSize: "14px", marginBottom: "10px" }}>
            <div>Age: {age}</div>
            <div>Gender: {gender}</div>
            <div>Course: {course}</div>
          </Card.Text>
          <FaCommentDots
            size={24}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              color: "#8B0000",
            }}
          />
        </div>
      </div>
      <Card.Body className="mt-3" style={{ fontSize: "14px", lineHeight: "1.5" }}>
        <strong>Bio:</strong> {bio || "No bio available"}
      </Card.Body>
    </Card>
  );
};

export default RoommateCard;
