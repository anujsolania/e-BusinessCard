const mongoose = require("mongoose")

require("dotenv").config()

mongoose.connect(`${process.env.MONGO_URL}`)
.then(() => console.log("connected to db"))
.catch((err) => console.log("unable to connect",err))

const cardschema = new mongoose.Schema({
    name: {type: String,required: true},
    about: {type: String,required: true},
    interests: {type: Array},
    url1: {type: String},
    url2: {type: String}
})

const Card = new mongoose.model("card",cardschema)

module.exports = Card