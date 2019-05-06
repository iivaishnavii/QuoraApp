var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.get('/:question',function(req,res){

        console.log("In get all questions request"+req.body)
        kafka.make_request("search-question",req,function(err,result){
            if(err)
            {
                console.log("Unable to search questions",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in getting questions')
            }
            else{
                console.log("Results for questions searched are"+result)
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result))
            }
        })
   // }
})

module.exports = router