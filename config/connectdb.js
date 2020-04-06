require("dotenv").config()
const mongoose = require("mongoose");

const URI = process.env.MONGO_URI
const connect = async ()=>{

    try {
        await mongoose.connect(URI,{
            useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
        })
        console.log("mongodb connected")
    } catch (err) {
        console.error(err.message)
        console.log("mongo database could not be connected")
        process.exit(1)
    }
}
module.exports= connect