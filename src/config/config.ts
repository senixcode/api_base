import { NodeEnv } from "../emuns"
const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env
const connectionUriMongoDb = NODE_ENV === NodeEnv.test ? MONGODB_URI_TEST : MONGODB_URI
export default {
    JWT_SECRET: process.env.JWT_SECRET || 'someSecretToken',
    DB: {
        URI: connectionUriMongoDb || 'mongodb://localhost/api_base',

    }
}