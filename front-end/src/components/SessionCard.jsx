import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PageLayout from "../components/PageLayout";

import {
    Container,
    Card,
    Button,
    Row,
    Col
} from "react-bootstrap";

function SessionCard({     
    session,
    addSchedule,
    removeSchedule,
    showJoin = true }) {
    return (
        <Col
            key={session.Id}
            md={4}
        >
            <Card >
                <Card.Body>
                    <div className="d-flex ustify-content-between">
                        <Card.Title>
                            {session.title}
                        </Card.Title>
                        <button className="btn ms-auto" onClick={() => session.inSchedule ? removeSchedule(session) : addSchedule(session)}>
                            <i className = {
                                session.inSchedule ? "bi bi-star-fill text-primary fs-4" : "bi bi-star text-muted fs-4"
                            }></i>
                        </button>
                    </div> 
                    <Card.Text>
                        {session.description}
                    </Card.Text>
                </Card.Body>    
                <ul className ="list-group list-group-flush">
                    <li className="list-group-item">Speaker: {session.speaker}</li>
                    <li className="list-group-item">Category: {session.category}</li>
                    <li className="list-group-item">Time: {session.fromTime} - {session.toTime}</li>
                </ul>
                <Card.Body className="d-flex fw-small">
                    {/* {session.inSchedule ?
                        <Button variant="danger" className="m-2" onClick={() => removeSchedule(session)}>Remove from Schedule</Button>
                        : <Button variant="primary" className="m-2" onClick={() => addSchedule(session)}>Add to Schedule</Button>
                    } */}
                    {showJoin && <Link to={`/live/${session.id}`} className="btn btn-danger m-2">Join Meeting</Link>}
                </Card.Body>
            </Card>
        </Col>
    );
}

export default SessionCard;