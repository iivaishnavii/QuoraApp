var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.get('/',function(req,res){
    console.log("in get all topics")
    
       console.log(req.body);
        kafka.make_request("getAllTopics",req,function(err,result){
            if(err)
            {
                console.log("Unable to get all topics",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in fetching topics')
            }
            else{
                console.log("fetched all topics"+result)
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
             
                res.end(JSON.stringify(result));
            }
        })
   // }
})

module.exports = router