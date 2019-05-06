var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.post('/followTopic', function(req,res){
    console.log("User following a topic")
    // if(req.session.user)
    // {
       console.log(req.body);
        kafka.make_request("followTopic",req,function(err,result){
            if(err)
            {
                console.log("Unable to follow topic",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in following a topic')
            }
            else{
                console.log("topic followed successfully"+result)
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end('Topic followed');
            }
        })
   // }
})

module.exports = router