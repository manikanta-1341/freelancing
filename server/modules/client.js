const mongoose = require('mongoose')
const Client = require('../models/client')
const bcrypt = require('bcrypt') 


module.exports.GetClient = async(req,res)=>{
    try{
        let response = await Client.findOne({})
        res.send(response)
    }
    catch(e){
        res.send(e)
    }
}



module.exports.PostCreation = async(req,res)=>{
    try{
        await Client.findOneAndUpdate(
            {_id: mongoose.Types.ObjectId(req.params.id)},
            {
                $push:{
                    projects:{...req.body,viewed:[],_id : mongoose.Types.ObjectId()}
                }
            }
        )
        res.send({msg : "Created."})
    }
    catch(e){ 
        res.send(e)
    }
}

module.exports.GetPost = async (req, res) => {
    try {
        let response = await Client.find({},{projects:1})
        res.send(response)
    } catch (e) {
        res.send(e)
    }
}

module.exports.GetPostUSER = async (req, res) => {
    try {
        let response = await Client.find({_id : req.params.id},{projects:1})
        
        res.send(response)
    } catch (e) {
        res.send(e)
    }
}