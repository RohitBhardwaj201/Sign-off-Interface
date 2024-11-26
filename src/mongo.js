const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/LoginoutDb')
.then(()=>{
    console.log("MongpDB Connected")
})
.catch(()=>{
    console.log("Error in connection")
})

const LoginSchema = new mongoose.Schema({
    name : String,
    password : mongoose.Schema.Types.Mixed
})

const collection = new mongoose.model('Collection1',LoginSchema)
module.exports = collection