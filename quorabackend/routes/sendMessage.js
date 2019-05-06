var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.post('/',requireAuth,function(req,res){
    console.log("Sending a message")
    // if(req.session.user)
    // {
       console.log(req.body);
        kafka.make_request("sendMessage",req,function(err,result){
            if(err)
            {
                console.log("Unable to send msg",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in sending a message')
            }
            else{
                console.log("Message sent successfully"+result)
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end('Message sent');
            }
        })
   // }
})

module.exports = router