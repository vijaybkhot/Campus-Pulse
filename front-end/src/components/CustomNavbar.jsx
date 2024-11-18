import React from "react";
import { Navbar, Form, FormControl, Image, Dropdown } from 'react-bootstrap';
import StevensLogo from '../assets/stevens_logo.jpeg';
import defaultProfile from '../assets/profile_pic.png'


import { Link } from 'react-router-dom';

const CustomNavbar = () => {

    return (
        <>
        <Navbar className="color-red-bg w-100 px-4" variant="dark">
            <Navbar.Brand className="py-0">
                <Link to="/">
                    <img src={StevensLogo}  alt="Stevens Friend Finder" className='mx-10' style={{ width: '60px' }} />
                </Link>
            </Navbar.Brand>
            <Form className="d-flex w-100">
                <FormControl type="text" placeholder="Search" className="mr-sm-2"
                    style={{ width: '700px', borderRadius: '50px', marginLeft: 'auto', marginRight:'auto' }}
                />
            </Form>
            <Dropdown align="end" className="ms-auto">
                <Dropdown.Toggle variant="link" id="profile-dropdown" className="p-0" style={{ border: 'none' }}>
                    <Image
                        src={defaultProfile}
                        roundedCircle
                        style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                    />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
                    <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Navbar>
        </>
    )
}

export default CustomNavbar