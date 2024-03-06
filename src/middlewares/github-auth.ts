import passport from "passport";
import { Strategy } from 'passport-github2';
import config from 'config'

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new Strategy(config.get('github'),
    async (email, password, done) => {
        try {
            // try to fetch the user from the database
            // according to the user input


            // if we did find a user in the database, inform passport about it
            return done(null);
        } catch (err) {
            // if any error occurred in the process, inform passport about it
            return done(err);
        }
    }
));

export default passport