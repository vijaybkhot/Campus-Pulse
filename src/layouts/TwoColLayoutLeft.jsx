import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const TwoColLayoutLeft = ({leftContent, centerContent, rightContent}) => {
    return (
        <Container>
            <Row>
                <Col className='overflow-hidden text-truncate text-wrap sticky-col px-0' md={3} >
                    {leftContent}
                </Col>
                <Col className='overflow-hidden text-truncate text-wrap' md={9} style={{ backgroundColor: '' }}>
                    {centerContent}
                </Col>
            </Row>
        </Container>
    )
}

export default TwoColLayoutLeft