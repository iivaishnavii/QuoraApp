var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.post('/:email',function(req,res){
    console.log("in update pro")
    // if(req.session.user)
    // {
        console.log("In update profile request"+req.body)
        kafka.make_request("update-profile",req,function(err,result){
            if(err)
            {
                console.log("Unable to update profile",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in adding a user')
            }
            else{
                console.log("User details saved successfully"+result)
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end('Adding a user successfully')
            }
        })
   // }
})

module.exports = router