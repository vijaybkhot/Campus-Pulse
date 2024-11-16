import React from "react";
import { Navbar, Form, FormControl, Image } from 'react-bootstrap';
import StevensLogo from '../assets/stevens_logo.jpeg';

const CustomNavbar = () => {

    return (
        <>
        <Navbar className="color-red-bg w-100 px-4" variant="dark">
            <Navbar.Brand className="py-0">
                <img src={StevensLogo}  alt="Stevens Friend Finder" className='mx-10' style={{ width: '60px' }} />
            </Navbar.Brand>
            <Form className="d-flex w-100">
                <FormControl type="text" placeholder="Search" className="mr-sm-2"
                    style={{ width: '700px', borderRadius: '50px', marginLeft: 'auto', marginRight:'auto' }}
                />
            </Form>
        </Navbar>
        </>
    )
}

export default CustomNavbar