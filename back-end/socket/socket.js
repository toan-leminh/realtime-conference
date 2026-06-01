import sessions from "../data/sessions.json" with { type: "json" };

function registerSocket(io) {
    let sessionList = {};
    sessions.forEach(element => {
        sessionList[element.id] =  {
            ...element,
            participants: {},
            messages: []
        }; 
    });

    io.on("connection", (socket) => {
        const user = socket.request.session?.passport?.user;
        console.log("User connected: ", user.username);

        socket.on("get-active-rooms", () => {
            const activeRooms = Object.values(sessionList).filter(
                session => Object.keys(session.participants).length > 0
            ).map(({ messages, ...session }) => session);
                        
            socket.emit("active-rooms", activeRooms);
        });


        // Listen for joining a session
        socket.on("join-room", ({ sessionId }) => {
            console.log("User " + user?.username + " joined session " + sessionId);
            socket.join(sessionId);

            const session = sessionList[sessionId];
            if(!session) return;

            session.participants[String(user.id)] = user;

            // Send room users
            io.to(sessionId).emit("room-users", {
                users: Object.values(session.participants)
            });

            // Send history messsages to user
            socket.emit("history", {
                messages: session.messages || []
            });

            // Broadcast to other users in the session that a new user has joined
            io.to(sessionId).emit("room-messages", {
                id: `${user.id}-${Date.now()}`,
                type: "notification",
                user: null,
                message: `User ${user?.username} has joined the session.`,
                timestamp: new Date()
            });

            // Broadcast to all users, update active sessions
            const activeRooms = Object.values(sessionList).filter(
                session => Object.keys(session.participants).length > 0
            ).map(({ messages, ...session }) => session);
            socket.broadcast.emit("active-rooms", activeRooms);
        });

        // Listen for leaving a session
        socket.on("leave-room", ({sessionId}) => {
            console.log("User " + user?.username + " leave session " + sessionId);

            socket.leave(sessionId);

            const session = sessionList[sessionId];
            if(!session) return;

            delete session.participants[String(user.id)];
            
            // Broadcast to other users in the session that a user has left
            io.to(sessionId).emit("room-messages", {
                id: `${user.id}-${Date.now()}`,
                type: "notification",
                message: `User ${user?.username} has left the session.`,
                timestamp: new Date()
            });

            // Broadcast list users
            io.to(sessionId).emit("room-users", {
                users: Object.values(session.participants)
            });

            // Broadcast to all users, update active sessions
            const activeRooms = Object.values(sessionList).filter(
                session => Object.keys(session.participants).length > 0
            ).map(({ messages, ...session }) => session);
            socket.broadcast.emit("active-rooms", activeRooms);

        });

        // Listen for sending a message in a session
        socket.on("send-message", ({ sessionId, message }) => {
            console.log("Received message from user " + user?.username + " in session " + sessionId + ": " + message);
            const session = sessionList[sessionId];
            // Broadcast list users   
            if(session) {
                console.log("Broadcasting message to session " + sessionId + ": " + message);
                const msg = {
                    id: `${user.id}-${Date.now()}`,
                    type: "message",
                    user,
                    message:  message,
                    timestamp: new Date()
                }
                io.to(sessionId).emit("room-messages", msg);
                session.messages.push(msg);
            }

            console.log(`User ${user?.username} sent message to session ${sessionId}: ${message}`);
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log("A user disconnected: " + socket.id);
            
            // Remove the user from all sessions they were part of
            for (const [sessionId, session] of Object.entries(sessionList)) {
                if (session.participants[String(user.id)]) {
                    delete session.participants[String(user.id)];
                    
                    // Broadcast to other users in the session that a user has left
                    io.to(sessionId).emit("room-messages", {
                         id: `${user.id}-${Date.now()}`,
                        type: "notification",
                        userId: socket.id,
                        message: `User ${user?.username} has disconnected.`,
                        timestamp: new Date()
                    });

                    // Broadcast list users
                    io.to(sessionId).emit("room-users", {
                        users: Object.values(session.participants)
                    });
                }
            }

        });
    });
}

export default registerSocket;
