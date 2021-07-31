export default {
    JWT_SECRET: process.env.JWT_SECRET || 'someSecretToken',
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost/api_base',

    }
}