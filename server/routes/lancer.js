const express = require('express')
const route = express.Router()
const fromModule = require('../modules/lancer')

route.patch('/apply/post/:id',fromModule.ApplyPost)



module.exports = route