const API_BASE_URL = "http://localhost:3000/api";

const redirectToLogin = () => {
    if (typeof window === "undefined") return;

    if (window.location.pathname !== "/") {
        window.location.replace("/");
    }
};

export const callApi = async (path, options = {}) => {
    const {
        headers: customHeaders = {},
        body,
        method = "GET",
        ...restOptions
    } = options;

    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...customHeaders
    };

    const requestOptions = {
        credentials: "include",
        method,
        headers,
        ...restOptions
    };

    requestOptions.body = JSON.stringify(body);

    const response = await fetch(`${API_BASE_URL}${path}`, requestOptions);

    if (response.status === 401) {
        redirectToLogin();
        throw new Error("Unauthorized");
    }

    if (!response.ok) {
        const errorMessage = `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
    }

    return response.json();
};

// Login by user/password
export const login = async (username, password) => {
    return callApi("/login", {
        method: "POST",
        body: { username, password }
    });
};

// Get all sessions
export const getAllSessions = async () => {
    return callApi("/sessions");
};

// Add to my schedule
export const addSchedule = async (sessionId) => {
    return callApi("/my-schedule", {
        method: "POST",
        body: { sessionId }
    });
};

// Remove from my schedule
export const removeSchedule = async (sessionId) => {
    return callApi("/my-schedule", {
        method: "DELETE",
        body: { sessionId }
    });
};

// Get my schedule
export const getMySchedule = async () => {
    return callApi("/my-schedule");
};
