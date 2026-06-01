import express from "express";
import session from "express-session";
import passport from "./middleware/passport.config.js";
import mainRouter from "./routes/main.route.js";
import registerSocket from "./socket/socket.js";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

// Express app configuration
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
);
app.use(express.static("public"));
app.use(express.json());
const sessionMiddleware = session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false
});
app.use(sessionMiddleware);

// Configure passport
app.use(passport.initialize());
app.use(passport.session());

// Config back-end routes
app.use("/api", mainRouter);

// Socket IO configuration
const server = http.createServer(app);
const io = new Server(server, {
        cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});
// Socket.IO integration with Express session
io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});

io.use((socket, next) => {
    const session = socket.request.session;

    if (socket.request.session?.passport?.user) {
        next();
    } else {
        next(new Error("Unauthorized"));
    }
});

// Config socket routes
registerSocket(io);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

