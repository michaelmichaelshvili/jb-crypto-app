import express, { urlencoded } from "express";
import userRouter from "./routers/users";
import path from "path";
import config from 'config'
import errorHandler from "./middlewares/error/error-handler";
import session from "express-session";
import auth from './middlewares/github-auth'

const server = express()

server.set('views', path.resolve(__dirname, 'views'));
server.set('view engine', 'ejs');

//auth
server.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 1.5
    }
}))
server.use(auth.initialize())
server.use(auth.session())

//general middlewares
server.use(urlencoded())
server.use('/users', userRouter)

//errors middlewares
server.use(errorHandler)

const port = config.get<number>('app.port')
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})