var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.post('/',function(req,res){
    console.log("Get Notifications")
    // if(req.session.user)
    // {
       console.log(req.body);
        kafka.make_request("notifications",req.body,function(err,result){
            if(err)
            {
                console.log("Unable to get notifications",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error');
            }
            else{
                console.log("notifications fetched successfully"+result)
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end(JSON.stringify(result));
            }
        })
   // }
})

module.exports = router