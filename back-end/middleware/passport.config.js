import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import users from "../data/users.json" with { type: "json" };
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";

// Config passport with Local Strategy (username/password)
function configurePassport() {
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

    passport.use(
        new LinkedInStrategy(
            {
                clientID: process.env.LINKEDIN_CLIENT_ID,
                clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
                callbackURL: "http://localhost:3000/auth/linkedin/callback",
                scope: ["r_liteprofile", "r_emailaddress"]
            },
            (accessToken, refreshToken, profile, done) => {

                // LinkedIn user data
                const user = {
                    id: profile.id,
                    username: profile.displayName,
                    name: profile.displayName,
                    avatar:
                        profile.photos?.[0]?.value || null,
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
        //const user = users.find(u => u.id === id);
        done(null, user);
    });
}
// Init passport configuration
configurePassport();

export default passport;