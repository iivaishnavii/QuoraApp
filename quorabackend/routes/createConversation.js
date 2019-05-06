var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.post('/conversations',  function (req, res) {

    console.log('Inside Create Conversation POST!');
    console.log('Request Body: ', req.body);
   
        kafka.make_request("createConversation", req.body, function(err, result){
            if(err){
                console.log("Error ", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error');
            }
            else{                
                console.log("Success", result);
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });
                res.end('Conversation created');
            }
        });
    
});

module.exports = router