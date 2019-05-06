var express = require('express')
var router=express.Router();
var jwt = require('jsonwebtoken');
var kafka = require('../kafka/client')
// Set up middleware
const secret = "cmpe-273-quora-app";


router.post('/',function(req,res){
   // console.log("Canvas Backend called"+req.body)
    kafka.make_request('login',req.body,function(err,result){
       
        if(err)
        {
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error in Login")
        }
        else
        {
            console.log("In results login")
            if(result)
            {
                req.session.user=result
                console.log("Sesssion Details"+req.session.user)
                var token = jwt.sign(result,secret,{
                    expiresIn : 10080
               })
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })

                var Result = {
                     result : result,
                    Token : token
                }
console.log("login sucess")
                res.end(JSON.stringify(Result));    

              
                
            }
            else{
                res.writeHead(401,
                    {
                        'Content-type' : 'text/plain'
                    })
                    console.log('Invalid Credentials')
                    res.end('Invalid Credentials')
            }
        }
    })
               
})

module.exports=router