const express = require('express')
const connectToMongo = require('./db')
const app = express()
const PORT = 9000
connectToMongo()

app.use(express.json())

app.use('/data',require('./Routes/api'))
app.use('/auth',require('./Routes/auth'))

app.listen(PORT , () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
