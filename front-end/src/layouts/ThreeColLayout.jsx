import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ThreeColLayout = ({leftContent, centerContent, rightContent}) => {
    return (
        <Container>
            <Row>
                <Col className='overflow-hidden text-truncate text-wrap sticky-col' md={3} >
                    {leftContent}
                </Col>
                <Col className='overflow-hidden text-truncate text-wrap' md={6} style={{ backgroundColor: '#fcfcfc' }}>
                    {centerContent}
                </Col>
                <Col className='overflow-hidden text-truncate text-wrap sticky-col' md={3}>
                    {rightContent}
                </Col>
            </Row>
        </Container>
    )
}

export default ThreeColLayout