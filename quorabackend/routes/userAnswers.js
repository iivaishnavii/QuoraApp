var express = require('express')

var router=express.Router();
var kafka = require('../kafka/client')
// Set up middleware

router.post('/',function(req,res){
    console.log(req);
    kafka.make_request('user_answers',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"unable to fetch answers"
            })
        }else{
            console.log("Inside else");
                res.json({
                    result:results
                });

                res.end();
            }
        
    });
})


module.exports=router