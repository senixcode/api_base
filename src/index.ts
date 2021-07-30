import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import './database'
const PORT = app.get('port')

function main() {
    app.listen(PORT)
    console.log('Server on port', PORT)
}

main()
