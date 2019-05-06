var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.get('/:email',function(req,res){
    console.log("User following a topic")
    
       console.log(req.body);
        kafka.make_request("getTopics",req,function(err,result){
            if(err)
            {
                console.log("Unable to follow topic",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in fetchin topics')
            }
            else{
                console.log("topic followed successfully"+result)
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end('Topic followed are:',result);
            }
        })
   // }
})

module.exports = router