require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./db/conn')
const authrouter = require('./routes/auth.route')

const app = express()

app.use(express.json()) //parsing json data into row data
app.use(cors()) // For connecting file to frontend
const port = 8090;
app.use(express.urlencoded({ extended: false }))

app.use('/auth', authrouter)

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})