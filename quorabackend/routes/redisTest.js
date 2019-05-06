var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


var express = require('express')
//var axios = require('axios')
//const fetch = require("node-fetch");
const redis = require('redis')
var router=express.Router();
const client = redis.createClient(6379)
        
// echo redis errors to the console
client.on('error', (err) => {
    console.log("Error " + err)
});

router.get('/',function(req,res){

            // create and connect redis client to local instance.
            const userQuestions = 'user:Questions';
            return client.get(userQuestions, (err, photos) => {
                if (photos) {
                    console.log("Photos" + JSON.parse(photos));
                    return res.json({ source: 'cache', data: JSON.parse(photos) })
         
                }
                else{
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
                            client.setex(userQuestions, 3600, JSON.stringify(result))
                            res.end(JSON.stringify(result))
                        }
                    })
                }



            })

     
   // }
})

module.exports = router