# Conference Connect Project: A Real-Time Conference Engagement PlatformProject
A sample real-time conference engagement platform project 
designed for professional events and technology conferences. Users will be able to log in using LinkedIn
authentication, browse through available conference sessions, save sessions to their personal schedule, and
join live session rooms where they can interact with other attendees in real time

# Tech Stacks
- Front-end: React (Vite) , Bootstrap
- Back-end: Express.js, Socket.IO

# Project Structures
```
realtime_conference/
│
├── front-end/   # Front-end
├  ├── src
├  ├── ├── App.jsx
├  ├── ├── pages/
├  ├── ├── ├── Login.jsx
├  ├── ├── ├── Dashboard.jsx
├  ├── ├── ├── MySchedule.jsx
├  ├── ├── ├── ActiveSessions.jsx
├  ├── ├── ├── ChatRoom.jsx
├  ├── ├── components/
├  ├── ├── ├── PageLayout.jsx
├  ├── ├── ├── Header.jsx
├  ├── ├── ├── RoomCard.jsx
├  ├── ├── ├── SessionCard.jsx
├  ├── ├── services/
├  ├── ├── ├── api.js
├  ├── ├── ├── socket.js
├  ├── public
├  ├── ├── favicon.svg
├── back-end/      # Back-end
├  ├── data/       # Sample data (users and sessions)
├  ├   ├── users.json/
├  ├   ├── session.json/
├  ├── middleware/
├  ├   ├── passport.config.js/
├  ├── public
├  ├── ├── images/
├  ├── routes/
├  ├   ├  ├── main.route.js
├  ├── socket/
├  ├   ├── socket.js
└── README.md
```

## Setup 
### Backend
Install all dependencies

```
$ npm install
```
Create .env file and input LinkedIn credentials (for LinkedIn integration)
( Obtain by creating an App in https://www.linkedin.com/developers )

```
LINKEDIN_CLIENT_ID=xxxxxxxx
LINKEDIN_CLIENT_SECRET=xxxxxxxxx
```

Then run back-end project

```
$ npm run dev
```
### Front-end
Install all dependencies

```
$ npm install
```

Then run back-end project

```
$ npm run dev
```
