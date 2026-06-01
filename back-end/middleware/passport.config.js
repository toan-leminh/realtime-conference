import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import users from "../data/users.json" with { type: "json" };
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";

function configurePassport() {
    // Config passport with Local Strategy (username/password)
    passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
        try {
            const user = users.find(u => u.username == username && u.password == password);

            if (!user) 
                return done(null, false, { 
                    message: 'User not found' 
                });
            
            return done(null, user);    
        } catch (e) {
            return done(e); 
        }
    }));
    // Config passport with LinkedIn 
    passport.use(
        new LinkedInStrategy(
            {
                clientID: process.env.LINKEDIN_CLIENT_ID,
                clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
                callbackURL: "http://localhost:3000/api/auth/linkedin/callback",
                scope: ["openid", "profile"],
                state: true
            },
            (accessToken, refreshToken, profile, done) => {
            
                console.log(profile);
                // LinkedIn user data
                const user = {
                    id: profile.id,
                    username: profile.displayName,
                    avatar: profile.picture
                };

                return done(null, user);
            }
        )
    );

    // Set user to session 
    passport.serializeUser((user, done) =>{
        done(null, {
            id: user.id,
            username: user.username,
            avatar: user.avatar
        })
    });
    
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}
// Init passport configuration
configurePassport();

export default passport;