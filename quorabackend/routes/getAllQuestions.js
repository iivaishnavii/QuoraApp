var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})
var router=express.Router();

        

router.get('/',function(req,res){

            // create and connect redis client to local instance.
           
                    console.log("In get all questions request"+req.body)
                    kafka.make_request("get-questions",req,function(err,result){
                        if(err)
                        {
                            console.log("Unable to get questions",err);
                            res.writeHead(400,{
                                'Content-type' : 'text/plain'
                            })
                            res.end('Error in getting questions')
                        }
                        else{
                            console.log("Questions asked by the user are"+result)
                            res.writeHead(200,{
                                'Content-Type' : 'application/json'
                            })
                            //client.setex(userQuestions, 3600, JSON.stringify(result))
                            let questions =JSON.stringify(result)
                            res.end(questions)
                        }
                    })
            })

     


module.exports = router