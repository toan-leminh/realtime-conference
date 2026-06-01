import express from "express";
import passport from "../middleware/passport.config.js";
import sessions from "../data/sessions.json" with { type: "json" };
// Config passport with Local Strategy (username/password)
const router = express.Router();
const allSchedules = {};

// Login by LinkedIn OAuth 
router.get(
    "/auth/linkedin",
    passport.authenticate("linkedin")
);

router.get(
    "/auth/linkedin/callback",
    passport.authenticate("linkedin", {
        failureRedirect: "http://localhost:5173/"
    }),
    (req, res) => {
        const user = req.session?.passport?.user;
        console.log("Login by LinkedIn success", user);

        res.redirect("http://localhost:5173/dashboard");
    }
);

// Login by username and password
router.post(
    "/login", 
    passport.authenticate("local"),
    (req, res) => {
        // Handle login logic here
        res.json({ 
            error: null,
            data: req.session?.passport?.user,
        });
});

// Logout
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: "Logout failed" });
        }

        req.session.destroy(() => {});

        res.json({ error: null, data: "Logged out successfully" });
    });
});

// Get all sessions 
router.get("/sessions", (req, res) => {
    const userId = req.session?.passport?.user?.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const myScheduleIds = allSchedules[userId] || [];
    const sessionsWithScheduleInfo = sessions.map(session => ({
        ...session,
        inSchedule: myScheduleIds.includes(session.id)
    }));

    res.json({ error: null, data: sessionsWithScheduleInfo });
});


router.get("/my-schedule", (req, res) => {
    const userId = req.session?.passport?.user?.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const sessionIds = allSchedules[userId] || [];
    const mySchedules = sessions.filter(session => sessionIds.includes(session.id));
    const mySchedulesWithInfo = mySchedules.map(session => ({
        ...session,
        inSchedule: true
    }));

    res.json({ error: null, data: mySchedulesWithInfo });
});

// Add session to my schedule
router.post("/my-schedule", (req, res) => {
    const userId = req.session?.passport?.user?.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { sessionId } = req.body;
    if (!sessionId) {
        return res.status(400).json({ error: "Session ID is required" });
    }

    if (!allSchedules[userId]) {
        allSchedules[userId] = [];
    }

    // Avoid adding duplicate sessions
    if (!allSchedules[userId].includes(sessionId)) {
        allSchedules[userId].push(sessionId);
    }

    res.json({ error: null, data: allSchedules[userId] });
});

// Remove session from my schedule
router.delete("/my-schedule", (req, res) => {
    const userId = req.session?.passport?.user?.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { sessionId } = req.body;
    if (!sessionId) {
        return res.status(400).json({ error: "Session ID is required" });
    }

    if (allSchedules[userId]) {
        allSchedules[userId] = allSchedules[userId].filter(id => id !== sessionId);
    }

    res.json({ error: null, data: allSchedules[userId] });
});


export default router;