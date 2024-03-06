import mysql from 'mysql2'
import util from 'util'
import config from 'config'
import mongoose from "mongoose";
import getUserSymbolModel from './models/user-symbol/factory';
import getSymbolValueModel from './models/symbol-value/factory';
import axios from 'axios';
import Cheerio from 'cheerio';
import { io } from 'socket.io-client';


//db connection
// const connection = mysql.createConnection(config.get("mysql"));
// const connect = util.promisify(connection.connect).bind(connection);
// const query = util.promisify(connection.query).bind(connection);

const socket = io(`ws://${config.get<string>('worker.io.host')}:${config.get<number>('worker.io.port')}`)


async function scrape(symbol: string) {
    console.log(`scraping ${symbol}`);
    const response = await axios(`https://www.google.com/finance/quote/${symbol}-USD`)
    const html = response.data
    const $ = Cheerio.load(html)
    const value = Number($(`.YMlKec.fxKbKc`).text().replace(',', ''))

    await getSymbolValueModel().add({
        symbol,
        value,
        when: new Date()
    })
    socket.emit('update from worker', { symbol, value })
    return
}

//worker job
async function work() {
    try {
        const symbols = await getUserSymbolModel().getUniqueSymbols();
        await Promise.allSettled(symbols.map(scrape))
    } catch (err) {
        console.log(err);
    } finally {
        setTimeout(work, config.get<number>("worker.interval"))
    }
}
(async () => {
    // await Promise.all([
    //     connect(),
    //     mongoose.connect(`mongodb://${config.get<string>('mongo.host')}:${config.get<number>('mongo.port')}/${config.get<string>('mongo.database')}`)
    // ])
    work()
})()