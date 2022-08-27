const mongoose = require('mongoose')
const Client = require('../models/client')
const Lancer = require('../models/lancer')

module.exports.ApplyPost = async (req, res) => {
    try {
        
        let client_id = req.body.client_id
        let project_id = req.body.project_id
        let lancer_details = req.body.lancer
        await Client.findOneAndUpdate(
            {_id : mongoose.Types.ObjectId(client_id)},
            {
                $push :{
                    'projects.$[cond].viewed':lancer_details
                },
                $set:{
                    'projects.$[cond].applied':"yes"
                }
            },
            { 
                arrayFilters: [ { "cond._id":mongoose.Types.ObjectId(project_id) } ] 
            }
        )
        let project_details = await Client.findOne({ "projects._id": mongoose.Types.ObjectId(project_id) }, { _id: 0, "projects.$": 1, })
        delete project_details.projects[0].viewed
        
        await Lancer.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(req.params.id) },
            {
                $push: { projects: project_details.projects[0] }
            },
            {
                new: true
            }
        )
        
        res.send({msg : "Applied Successfully"})
    } catch (e) {
        res.send(e)   
    }
}