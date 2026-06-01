import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PageLayout from "../components/PageLayout";
import { useEffect, useState } from "react";
import SessionCard from "../components/SessionCard";
import { getMySchedule, addSchedule, removeSchedule, getAllSessions } from "../services/api";

import {
    Container,
    Card,
    Button,
    Row,
    Col
} from "react-bootstrap";

function Dashboard() {
    const [mySchedule, setMySchedule] = useState([]);
    const [sessions, setSessions] = useState([]);

    const username = localStorage.getItem("username");

    const fetchSessions = async () => {
        try {
            const res = await getAllSessions();
            
            setSessions(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch sessions data from API
    useEffect(() => {
        fetchSessions();
    }, []);

    const handleAddSchedule = async (session) => {
        // Call API
        try {
            await addSchedule(session.id);

            // Update UI (optimistic update)
            session.inSchedule = true;

            // Update sessions
            setSessions(sessions.map(s => s.id === session.id ? session : s));
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemoveSchedule = async (session) => {
        // Call API
        try {
            await removeSchedule(session.id);

            // Update UI (optimistic update)
            session.inSchedule = false;
            setSessions(sessions.map(s => s.id === session.id ? session : s));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <PageLayout
            title="Dashboard"
            description="All available conference sessions."
            action={<></>}
        >
            {
                <Container>
                    <Row className="g-4">
                        {sessions.map((session, index) => (
                            <SessionCard
                                key={index}
                                session={session}
                                addSchedule={handleAddSchedule}
                                removeSchedule={handleRemoveSchedule}
                            /> 
                        ))}
                    </Row>
                </Container>   
            }
        </PageLayout>
    );
}

export default Dashboard;