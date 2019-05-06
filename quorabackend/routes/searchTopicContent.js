var express = require('express')

var router=express.Router();
var kafka = require('../kafka/client')
// Set up middleware

router.post('/',function(req,res){
    console.log(req);
    kafka.make_request('searchTopicContent',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"eror",
                msg:"unable to fetch topic content"
            })
        }else{
            console.log("Inside else");
                res.json({
                    topicContent:results
                });

                res.end();
            }
        
    });
})


module.exports=router