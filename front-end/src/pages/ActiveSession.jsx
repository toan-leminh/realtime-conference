import { Link } from "react-router-dom";
import Header from "../components/Header";
import PageLayout from "../components/PageLayout";
import { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";
import socket from "../services/socket";

import {
    Container,
    Card,
    Button,
    Row,
    Col
} from "react-bootstrap";

function ActiveSession() {
    const [mySchedule, setMySchedule] = useState([]);
    const [rooms, setRooms] = useState([]);
    
    // Connect socket 
    socket.connect();

    // Fetch sessions data from API
    useEffect(() => {        
        socket.emit('get-active-rooms');
        socket.on("active-rooms", (data) => {
            setRooms(data);
        }, []);

        //getMySessions();

        return () => {
            socket.off("active-rooms", () =>{
                setRooms([]);
            });
        };
    }, []);

    return (
        <PageLayout
            title="Active sessions"
            description="Display all active sessions"
            action={
                <Link to="/dashboard" className="btn btn-secondary">
                    Back to Dashboard
                </Link>
            }
        >
            {
                <Container>
                    <Row className="g-4">
                        {rooms.map((room, index) => (
                            <RoomCard
                                activeRoom={room}
                            /> 
                        ))}
                    </Row>
                </Container>   
            }
        </PageLayout>
    );
}

export default ActiveSession;