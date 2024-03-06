import express, { urlencoded } from "express";
import userRouter from "./routers/users";
import path from "path";
import config from 'config'
import errorHandler from "./middlewares/error/error-handler";
const server = express()

server.set('views', path.resolve(__dirname, 'views'));
server.set('view engine', 'ejs');

//general middlewares
server.use(urlencoded())
server.use('/users', userRouter)

//errors middlewares
server.use(errorHandler)

const port = config.get<number>('app.port')
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})