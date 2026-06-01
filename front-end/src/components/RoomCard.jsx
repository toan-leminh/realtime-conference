import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import PageLayout from "./PageLayout";

import {
    Container,
    Card,
    Button,
    Row,
    Col
} from "react-bootstrap";

function RoomCard({     
    activeRoom,
    }) {
    return (
        <Col
            key={activeRoom.Id}
            md={4}
        >
            <Card >
                <Card.Body>
                    <Card.Title>
                        {activeRoom.title}
                    </Card.Title>
                    {/* <Card.Text>
                        {activeRooms.description}
                    </Card.Text> */}
                </Card.Body>    
                <ul className ="list-group list-group-flush">
                    <li className="list-group-item">Number of users: {Object.keys(activeRoom.participants).length}</li>
                </ul>
                <Card.Body className="d-flex fw-small">
                    <Link to="/chat-room" className="btn btn-danger m-2">Join</Link>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default RoomCard;