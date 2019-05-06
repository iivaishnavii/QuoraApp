var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.post('/',function(req,res){

        console.log("In get all activities request"+req.body)
        kafka.make_request("get_activity",req,function(err,result){
            if(err)
            {
                console.log("Unable to get activities",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in getting activities')
            }
            else{
                console.log("activities done by the user are"+result)
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result))
            }
        })
   // }
})

module.exports = router