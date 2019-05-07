var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.get('/',function(req,res){
    console.log("in  get top downvoted answers")
    
       
        kafka.make_request("topDownvotes",req,function(err,result){
            if(err)
            {
                console.log("Unable to get top downvoted answers",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in fetching top downvoted answers')
            }
            else{
                console.log("fetched all top downvoted answers"+result)
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
             
                const graph = [];

            for (let d in result) {
          let label = result[d].answer;
          let y = result[d].downVotes;
    
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