const express = require('express')
const route = express.Router()
const fromModule = require('../modules/auth')
const fromClient = require('../modules/client')
route.get('/',fromModule.Started)
route.put('/client/login',fromModule.clientLogin)

route.post('/client/create',fromModule.CreateClient)

route.patch('/client/verificationMail',fromModule.EmailVerificationSent)
route.get('/client/account/verify/:id',fromModule.EmailVerify)

route.patch('/client/forgetpassword',fromModule.ForgetPassword)
route.get('/client/verify/:id',fromModule.ForgetPasswordVerify)
route.patch('/client/savepassword/:id',fromModule.savePassword)

//--------lancer---------
route.put('/lancer/login',fromModule.LancerLogin)
route.post('/lancer/create',fromModule.CreateLancer)
route.patch('/lancer/verificationMail',fromModule.LancerEmailVerificationSent)
route.get('/lancer/account/verify/:id',fromModule.LancerEmailVerify)

route.patch('/lancer/forgetpassword',fromModule.LancerForgetPassword)
route.get('/lancer/verify/:id',fromModule.LancerForgetPasswordVerify)
route.patch('/lancer/savepassword/:id',fromModule.LancersavePassword)

//----------get posts-----
route.get('/posts',fromClient.GetPost)
route.get('/posts/:id',fromClient.GetPostUSER)



module.exports = route