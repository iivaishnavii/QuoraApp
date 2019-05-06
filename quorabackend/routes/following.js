var express = require('express')

var router=express.Router();
var kafka = require('../kafka/client')
// Set up middleware

router.post('/',function(req,res){
    console.log(req);
    kafka.make_request('get_following',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"unable to fetch following"
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