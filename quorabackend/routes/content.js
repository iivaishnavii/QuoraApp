var express = require('express')

var router=express.Router();
var kafka = require('../kafka/client')

router.post('/',function(req,res){
    console.log(req);
    console.log('in content req');
    kafka.make_request('content',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"unable to fetch content"
            })
        }else{
            console.log("Inside else");
                res.json({
                    content:results
                });

                res.end();
            }
        
    });
})


module.exports=router