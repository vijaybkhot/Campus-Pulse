import React from "react";
import { Card, Button } from "react-bootstrap";

const CallToActionCard = ({textContent, buttonTxt, buttonUrl}) => {
    return (
        <Card style={{ width: '18rem', borderRadius: '10px', padding: '10px', backgroundColor:'#F4F4F4' }}>
          <Card.Body>
            <Card.Title>
              <h2>{textContent}</h2>
            </Card.Title>
            <Button
              variant="danger"
              href={buttonUrl}
              style={{ borderRadius: '15px', marginTop: '20px' }}
              className="w-100 color-red-bg"
            >
              {buttonTxt}
            </Button>
          </Card.Body>
        </Card>
      );
}

export default CallToActionCard