import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PageLayout from "../components/PageLayout";
import { useEffect, useState } from "react";
import SessionCard from "../components/SessionCard";
import { getMySchedule, addSchedule, removeSchedule } from "../services/api";

import {
    Container,
    Card,
    Button,
    Row,
    Col
} from "react-bootstrap";

function MySchedule() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    const handleViewSchedule = () => {
        navigate("/my-schedule");
    }

    const getSessions = async () => {
        try {
            const res = await getMySchedule();
            setSessions(res.data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
        
    // Fetch sessions data from API
    useEffect(() => {
        getSessions();
        
    }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // Click "Add to Schedule" button event 
    const handleRemoveSchedule = async (session) => {
        // Call API
        try {
            await removeSchedule(session.id);
            // Update UI (optimistic update)
            setSessions(
                sessions.filter(s => s.id !== session.id)
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <PageLayout
            title="My schedule"
            description="Personal schedule"
            action={<></>}
        >
            {/* Additional dashboard content can go here */
                <Container>
                    <Row className="g-4">
                        {sessions.map((session, index) => (
                            <SessionCard
                                key={index}
                                session={session}
                                removeSchedule={handleRemoveSchedule}
                            /> 
                        ))}
                    </Row>
                </Container>   
            }
        </PageLayout>
    );
}

export default MySchedule;