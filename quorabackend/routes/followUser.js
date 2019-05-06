var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.post('/', function(req,res){
    console.log("User following a user")
    // if(req.session.user)
    // {
       console.log(req.body);
        kafka.make_request("followUser",req,function(err,result){
            if(err)
            {
                console.log("Unable to follow User",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in following a User')
            }
            else{
                console.log("user followed successfully"+result)
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end('User followed');
            }
        })
   // }
})

module.exports = router