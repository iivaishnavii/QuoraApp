var express = require('express')

var router=express.Router();
var kafka = require('../kafka/client')
// Set up middleware

router.post('/',function(req,res){
    console.log(req);
    kafka.make_request('searchUserFollowing',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"eror",
                msg:"unable to fetch questions"
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