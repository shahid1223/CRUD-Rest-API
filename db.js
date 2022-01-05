const mongoose = require('mongoose')
const MONGOURI = ""
const connectToMongo = () => {
    mongoose.connect(MONGOURI, () => {
        console.log("Connected to mongodb")
    })
}
module.exports = connectToMongo
