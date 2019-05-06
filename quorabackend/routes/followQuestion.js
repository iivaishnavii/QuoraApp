var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.post('/',function(req,res){
    console.log("in update pro")
    // if(req.session.user)
    // {
        console.log("In follow question request"+req.body)
        kafka.make_request("follow-question",req,function(err,result){
            if(err)
            {
                console.log("Unable to create answer",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Following a question successfully')
            }
            else{
                console.log("Questions added successfully body"+result)
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end('Following a question successfully')
            }
        })
   // }
})

module.exports = router