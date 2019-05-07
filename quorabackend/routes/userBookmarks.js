var express = require('express')
var router=express.Router();
// var User = require("../app/api/models/users.js")
var passport = require('passport');
var jwt = require('jsonwebtoken');
var kafka = require('../kafka/client')
var requireAuth = passport.authenticate('jwt', {session: false});

router.post('/',function(req,res){
    // router.get('/',function(req,res){
    console.log("Inside userbookmarks Canvas Backend")
    kafka.make_request('user_bookmarks',req,function(err,result){
        //console.log("Inside view assignment service")
        if(result)
        {
            console.log("Recevied repsonse"+result)
            res.writeHead(200,{
                'Content-type' : 'application/json'
            })
            res.end(JSON.stringify(result))
        }
        else if(err)
        {
            res.writeHead(404,{
                'Content-type':'text/plain'
            })
            res.end("Could not find quizzes")
        }
    
    })


})

module.exports = router