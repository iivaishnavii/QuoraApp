var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.get('/:topic',function(req,res){

        console.log("In search topics request " + req.params)
        kafka.make_request("search-topic",req.params,function(err,result){
            if(err)
            {
                console.log("Unable to search questions",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in getting questions')
            }
            else{
                console.log(result);
                console.log("Results for questions searched are" + result)
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(result))
            }
        })
   // }
})

module.exports = router