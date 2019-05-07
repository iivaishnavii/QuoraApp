var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})
var Model = require('../../kafka-backend/config/MongoConnection');


router.get('/',function(req,res){

    console.log("In get all answers request"+req.body)
    Model.UserModel.find({},{'Name':1,'Email':1},(err,user)=>{
        if(err)
        {
            res.writeHead(400,{
                'Content-type' : 'text/plain'
            })
            res.end('Error in getting users')
        }
        else
        {
            
            console.log("Answers listed are"+user)
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            })
            res.end(JSON.stringify(user))
        }
    })
    
// }
})

module.exports = router