import React from "react";
import CallToActionCard from "./CallToActionCard";
import { Container, Row } from "react-bootstrap";

const HomeSidebar = () =>  {

    return (
        <Container>

            <div className="mt-5">
                <h3 className="color-red">Your Next Steps</h3>
            </div>
            <Row className="my-4">
                <CallToActionCard textContent='Find a Roomate' buttonTxt='Go' buttonUrl='/findroommates' />
            </Row>
            <Row className="my-4">
                <CallToActionCard textContent='Discover New Events' buttonTxt='View' buttonUrl='/events' />
            </Row>
        </Container>
    )

}

export default HomeSidebar