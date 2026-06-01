import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import PageLayout from "../components/PageLayout";
import { useEffect, useState, useRef } from "react";
import  socket  from "../services/socket";

import {
    Container,
    Card,
    Button,
    Row,
    Col
} from "react-bootstrap";

function ChatRoom() {
    const username = localStorage.getItem("username");
    const [users, setUsers] = useState([]);
    const [historyMessages, setHistoryMessages] = useState([]);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();
    const bottomRef = useRef(null);

    socket.connect();

    useEffect(() => {
        socket.emit('join-room', { sessionId: id });
        
        // Get history mesages
        socket.on('history', ({messages}) => {
            console.log("History messages: ", messages);
            setHistoryMessages(messages);
            scrollToBottom();
        });

        // Get all users in the room
        socket.on('room-users', ({users}) => {
            console.log("users in room");
            console.log(users);
            setUsers(users);
        });

        // Get all messages in the room
        socket.on('room-messages', (data) => {
            console.log("messages in room", data);
            setHistoryMessages( prev => [...prev, data]);
            scrollToBottom();
        });

        return () => {
            socket.emit('leave-room', { sessionId: id, username });
            socket.off('room-users');
            socket.off('room-messages');
        };

    }, []);

    const sendMessage = () => {
        // Implement send message functionality here
        if (message.trim() == "") return;

        // Send message
        console.log("send message", message);
        socket.emit('send-message', { sessionId : id, message });
        setMessage("");

        // Auto-scroll to bottom
        scrollToBottom()
    }

    const scrollToBottom = () =>{
        // Auto-scroll to bottom
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }, 100);
    }
    
    return (
        <PageLayout
            title={`Chat Room:  ${id}!`}
            description="Live chat room"
            action={
                <Button variant="danger" className="ms-auto m-2" onClick={() => navigate("/dashboard")}>
                    Leave Meeting
                </Button>
            }
        >
            {
                <div className="container py-3 border rounded-3 mb-3">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                            <h5 className="font-weight-bold mb-3 text-center text-lg-start">Member</h5>

                            <div className="card border-0 shadow" style={{ height: "600px" }} >
                                <div className="card-body overflow-auto ">
                                    <ul className="list-unstyled mb-0">
                                        {users.map((user) => (
                                            <li key={user.id} className="p-2 border-bottom bg-body-tertiary">
                                                <div className="d-flex flex-row">
                                                    <img
                                                        src={user.avatar}
                                                        alt="avatar"
                                                        className="rounded-circle me-3"
                                                        width="60"
                                                    />
                                                    <div className="pt-1">
                                                        <p className="fw-bold mb-0">
                                                            {user.username}
                                                        </p>
                                                        <p className="small text-muted">
                                                            Online
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-7 col-xl-8">
                            <div className="d-flex flex-column" style={{ height: "650px" }} >
                                <div className="flex-grow-1 overflow-auto p-3">
                                    <ul className="list-unstyled">
                                        {historyMessages.map(({user, message, type, timestamp}) => 
                                            ( 
                                            type == "message" ? 
                                                <li key={message.id} className={`d-flex justify-content-between mb-4 ${user.username === username ? "flex-row-reverse" : ""}`}>
                                                    <img
                                                        src={user.avatar}
                                                        alt="avatar"
                                                        className={`rounded-circle d-flex align-self-start shadow-1-strong ${user.username === username ? "ms-3" : "me-3"}`}
                                                        width="60"
                                                    />
                                                    <div className="card border-0 shadow-sm  w-100">
                                                        <div className="card-header d-flex justify-content-between p-3 border-0">
                                                            <p className="fw-bold mb-0">
                                                                {user.username}
                                                            </p>

                                                            <p className="small text-muted">
                                                                {timestamp}
                                                            </p>
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="mb-0">
                                                                {message}
                                                            </p> 
                                                        </div>
                                                    </div>
                                                </li>
                                            : 
                                                <li key={message.id}>
                                                    <p>
                                                        {message} at {timestamp}
                                                    </p> 
                                                </li>
                                            )
                                        )}

                                    </ul>
                                    <div ref={bottomRef} />
                                </div>
                                <div className="bg-white p-3">
                                    <textarea className="form-control mb-2" rows="3" placeholder="Type message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                                    <button className="btn btn-primary float-end" onClick={sendMessage}>
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>            
            }
        </PageLayout>
    );
}

export default ChatRoom;

