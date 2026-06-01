import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MySchedule from './pages/MySchedule';
import ChatRoom from './pages/ChatRoom';
import ActiveSession from './pages/ActiveSession';


function App() {
    const [count, setCount] = useState(0)

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-schedule" element={<MySchedule />} />
            <Route path="/active-session" element={<ActiveSession />} />
            <Route path="/live/:id" element={<ChatRoom />} />
        </Routes>
    )
}

export default App
