var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.post('/',requireAuth,function(req,res){
    console.log("in update answer")
   
        kafka.make_request("update-answer",req,function(err,result){
            if(err)
            {
                console.log("Unable to update answer",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in updating answer')
            }
            else{
                console.log("answer updated successfully"+result)
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end('answer updated successfully')
            }
        })
})

module.exports = router