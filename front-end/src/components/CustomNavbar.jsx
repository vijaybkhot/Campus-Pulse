import React, { useState, useEffect } from "react";
import { Navbar, Form, FormControl, Image, Dropdown, Button, Row, Col } from 'react-bootstrap';
import StevensLogo from '../assets/stevens_logo.jpeg';
import defaultProfile from '../assets/profile_pic.png';
import { useNavigate, Link } from "react-router-dom";

const CustomNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('jwtToken')));

    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            setIsLoggedIn(Boolean(localStorage.getItem('jwtToken')));
        };

        checkAuth(); // Initial check when component mounts

        const handleStorageChange = () => {
            checkAuth(); // Sync across tabs when localStorage changes
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <Navbar className="color-red-bg w-100 px-4" variant="dark">
            <Navbar.Brand className="py-0">
                <Link to="/">
                    <img src={StevensLogo} alt="Stevens Friend Finder" className="mx-10" style={{ width: '60px' }} />
                </Link>
            </Navbar.Brand>
            <Form className="d-flex w-100">
                <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    style={{ width: '700px', borderRadius: '50px', marginLeft: 'auto', marginRight: 'auto' }}
                />
            </Form>
            {isLoggedIn ? (
                <Dropdown align="end" className="ms-auto">
                    <Dropdown.Toggle variant="link" id="profile-dropdown" className="p-0" style={{ border: 'none' }}>
                        <Image
                            src={defaultProfile}
                            roundedCircle
                            style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/profile">View Profile</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ) : (
                <div className="w-50 d-flex justify-content-end">
                    <Row className="g-2 align-items-center">
                        <Col xs="auto">
                            <Button variant="outline-light" as={Link} to="/login" className="me-3">
                                Login
                            </Button>
                        </Col>
                        <Col xs="auto">
                            <Button variant="light" as={Link} to="/signup" className="w-100">
                                Sign Up
                            </Button>
                        </Col>
                    </Row>
                </div>
            )}
        </Navbar>
    );
};

export default CustomNavbar;
