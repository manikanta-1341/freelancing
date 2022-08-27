const mongoose = require('mongoose')
const schema = mongoose.Schema

const LancerSchema = new schema({
    firstname:{ 
        type:String,
        required:true
    },
    lastname:{ 
        type:String,
        required:true
    },
    email:{ 
        type:String,
        required:true
    },
    password:{ 
        type:String,
        required:true
    },
    verification:{
        type:String,
        default:'no'
    },
    projects:{ 
        type:Array,
        default:[]
    },
    randomString:{
        type:String,
        default:""
    }
})

const Lancer = new mongoose.model('lancer',LancerSchema,'lancer')

module.exports = Lancer