const mongoose = require('mongoose')

module.exports.Connect = async()=>{
    try{
        await mongoose.connect(process.env.mongodb_url)
        
    }
    catch(e){
        console.log("error while connecting to db",e)
    }
}