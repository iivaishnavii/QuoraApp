var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.delete('/:email',function(req,res){
    console.log("in delete pro")
    // if(req.session.user)
    // {
        console.log("In delete request"+req.body)
        kafka.make_request("delete-user",req,function(err,result){
            if(err)
            {
                console.log("Unable to delete user",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in deleting a user')
            }
            else{
                console.log("Deleted User successfully"+result)
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end('Deleted user successfully')
            }
        })
   // }
})

module.exports = router