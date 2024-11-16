import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const TwoColLayoutLeft = ({leftContent, centerContent, rightContent}) => {
    return (
        <Container>
            <Row>
                <Col className='overflow-hidden text-truncate text-wrap sticky-col' md={3} >
                    {leftContent}
                </Col>
                <Col className='overflow-hidden text-truncate text-wrap' md={9} style={{ backgroundColor: '#e9ecef' }}>
                    {centerContent}
                </Col>
            </Row>
        </Container>
    )
}

export default TwoColLayoutLeft