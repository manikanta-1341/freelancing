const express = require('express')
const route = express.Router()
const fromModule = require('../modules/client')
route.get('/',fromModule.GetClient)
route.put('/create/post/:id',fromModule.PostCreation)
module.exports = route