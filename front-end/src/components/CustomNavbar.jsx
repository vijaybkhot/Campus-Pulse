import React, { useState, useEffect } from "react";
import { Navbar, Form, FormControl, Image, Dropdown, Button, Row, Col, Nav } from "react-bootstrap";
import StevensLogo from "../assets/stevens_logo.jpeg";
import { useNavigate, NavLink } from "react-router-dom";
import DataService from "../api/DataService";

const CustomNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem("jwtToken")));
  const [userProfile, setUserProfile] = useState(null); // State for user's profile data
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("jwtToken")));
    };

    const fetchUserProfile = async () => {
      if (isLoggedIn) {
        try {
          const response = await DataService.getUserProfile(); // Fetch user profile
          setUserProfile(response.data); // Save user profile data
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };

    checkAuth();
    fetchUserProfile();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    setUserProfile(null); // Clear user profile on logout
    navigate("/login");
  };

  const userProfileImage = userProfile?.photo
    ? userProfile.photo // Use user's photo if available
    : userProfile?.gender?.toLowerCase() === "female"
    ? "https://avatar.iran.liara.run/public/girl"
    : userProfile?.gender?.toLowerCase() === "male"
    ? "https://avatar.iran.liara.run/public/boy"
    : "https://avatar.iran.liara.run/public"; // Default avatar

  return (
    <Navbar className="color-red-bg w-100 px-4" variant="dark" expand="lg">
      <Navbar.Brand className="py-0">
        <NavLink to="/" className="navbar-brand">
          <img src={StevensLogo} alt="Stevens Friend Finder" className="mx-10" style={{ width: "60px" }} />
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Home
          </NavLink>
          <NavLink to="/findroommates" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Find Roommates
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Events
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Profile
          </NavLink>
        </Nav>
        <Form className="d-flex w-50 mx-auto">
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            style={{ width: "100%", borderRadius: "50px" }}
          />
        </Form>
        {isLoggedIn ? (
          <Dropdown align="end" className="ms-auto">
            <Dropdown.Toggle variant="link" id="profile-dropdown" className="p-0" style={{ border: "none" }}>
              <Image
                src={userProfileImage} // Dynamically display user's avatar
                roundedCircle
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/profile">
                View Profile
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/settings">
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <div className="w-50 d-flex justify-content-end">
            <Row className="g-2 align-items-center">
              <Col xs="auto">
                <Button variant="outline-light" as={NavLink} to="/login" className="me-3">
                  Login
                </Button>
              </Col>
              <Col xs="auto">
                <Button variant="light" as={NavLink} to="/signup" className="w-100">
                  Sign Up
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
