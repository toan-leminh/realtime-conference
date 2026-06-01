import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {login } from "../services/api";
import { Link } from "react-router-dom";

import {
    Container,
    Card,
    Form,
    Button,
    Alert
} from "react-bootstrap";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await login(username, password);
            // Store the username in localStorage
            localStorage.setItem("username", username);
            
            // Navigate to the dashboard
            navigate("/dashboard");
        } catch (error) {
            setErrorMessage("Invalid username or password");
            console.error("Login failed:", error);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Card style={{ width: "400px" }}>
            <Card.Body>
                <Card.Title className="text-center mb-4">Login</Card.Title>
                {
                    errorMessage && (
                        <Alert variant="danger" className="text-center">
                            {errorMessage}
                        </Alert>
                    )
                }

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                
                    <Button variant="primary" type="submit" className="w-100 mt-3">
                        Login
                    </Button>
                    <Link to="/auth/linkedin" className="btn btn-secondary w-100 mt-2">
                        Login with LinkedIn
                    </Link>
                </Form>
            </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;