import passport, { use } from "passport";
import { Profile, Strategy } from 'passport-github2';
import config from 'config'
import getUserModel from "../models/user/factory";

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
    done(null, user);
});

passport.use(new Strategy(
    { ...config.get('github') },
    async function (accessToken, refreshToken, profile, done) {
        try {
            const githubId = profile.id
            let user = await getUserModel().get(githubId)
            if (!user) {
                user = await getUserModel().signup({ githubId })
            }
            if (!user) {
                return done(null, false)
            }
            return done(null, user)
        } catch (err) {
            done(err)
        }
    }
));

export default passport