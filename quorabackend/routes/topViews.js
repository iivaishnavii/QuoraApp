var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.get('/',function(req,res){
    console.log("in  get top upvoted answers")
    
       
        kafka.make_request("topViews",req,function(err,result){
            if(err)
            {
                console.log("Unable to get top viewed answers",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in fetching top viewed answers')
            }
            else{
                console.log("fetched all top viewed answers"+result)
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
             
                const graph = [];

            for (let d in result) {
          let label = result[d].answer;
          let y = result[d].views;
    
          const data = {
            label,y
          }
    
          graph.push(data)
        }
    
        console.log("graph");
        console.log(graph);

        let results = {
            graph : graph,
            res : result
        }



                res.end(JSON.stringify(results));
            }
        })
   // }
})

module.exports = router