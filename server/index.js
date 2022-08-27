const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connection = require('./shared/connect')
const app = express()
app.use(express.json())
dotenv.config()
connection.Connect()
app.use(cors())

const client = require('./routes/client')
const auth = require('./routes/auth')
const lancer = require('./routes/lancer')
app.use('/',auth)
app.use('/client',client)
app.use('/lancer',lancer)



app.listen(process.env.PORT || 5000)