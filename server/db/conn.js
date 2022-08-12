const mongoose = require('mongoose')
const Db =  "mongodb+srv://AnantJindal:5687Anant@cluster0.ba8yhhj.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(Db).then(()=>console.log("connection created")).catch((err)=>console.log(err.message))