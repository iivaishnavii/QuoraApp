var express = require('express')
const bcrypt = require('bcrypt')
var router=express.Router();
var kafka = require('../kafka/client')
// Set up middleware

router.post('/',function(req,res){
    console.log("In backend sign up");
    console.log("Request"+req.body)
    kafka.make_request('signup',req.body,function(err,result){
        console.log("In results"+result)
        if(result)
        {
            console.log("user saved successfully")
            res.writeHead(200,{
                'Content-type' : 'text/plain'
            })
            res.end("User added successfully")
        }
        else if(result == null)
        {
            console.log("user exists")
            res.writeHead(210,{
                'Content-type' : 'text/plain'
            })
            res.end("Duplicate User")
        }
        if(err)
        {
            console.log("Unable to fetch details.Error in signup "+err);
            res.writeHead(400,{
                'Content-type' : 'text/plain'
            })
            res.end("Error in fetching user details");
        }
    })

})


module.exports=router