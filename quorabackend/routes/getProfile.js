var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.get('/:email',function(req,res){

        console.log("In get profile request"+req.body)
        kafka.make_request("get-profile",req,function(err,result){
            if(err)
            {
                console.log("Unable to update profile",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in retrieving a user')
            }
            else{
                console.log("User details saved successfully"+result)
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result))
            }
        })
   // }
})

module.exports = router