var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.get('/',requireAuth,function(req,res){
    console.log("Get followers")
    // if(req.session.user)
    // {
       console.log(req.params);
        kafka.make_request("getFollowers",req.params,function(err,result){
            if(err)
            {
                console.log("Unable to get followers",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error');
            }
            else{
                console.log("users fetched successfully"+result)
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end('User fetched');
            }
        })
   // }
})

module.exports = router