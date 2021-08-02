import mongoose, { ConnectOptions } from 'mongoose'
import config from './config/config'

const dbOptions: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}
export default function initializetDatabase(): void {

    mongoose
        .connect(config.DB.URI, dbOptions)
        .then(() => console.log('database is connected'))
        .catch((err) => console.log(err))
}
