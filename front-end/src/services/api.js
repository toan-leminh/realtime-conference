const API_BASE_URL = "http://localhost:3000/api";

// Login by user/password
export const login = async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response.json();
};

// Get all sessions
export const getAllSessions = async () => {
    const response = await fetch(`${API_BASE_URL}/sessions`
    ,{
        credentials: "include"
    }
    );
    
    if (!response.ok) {
        throw new Error("Failed to fetch sessions");
    }
    
    return  response.json();
}

// Add to my schedule
export const addSchedule = async (sessionId) => {
    await fetch(`${API_BASE_URL}/my-schedule`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sessionId })
    });
}
// Remove from my schedule
export const removeSchedule = async (sessionId) => {
    await fetch(`${API_BASE_URL}/my-schedule`, {
        credentials: "include",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sessionId })
    });
}

// Get my schedule
export const getMySchedule = async () => {
    const response = await fetch(`${API_BASE_URL}/my-schedule`, {
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Failed to fetch my schedule");
    }
    return response.json();
}