import mongoose from "mongoose";
import config from "config"

mongoose.connect(`mongodb://${config.get<string>('mongo.host')}:${config.get<number>('mongo.port')}/${config.get<string>('mongo.database')}`)

export default mongoose