var express = require('express')
var router=express.Router();
var kafka = require('../kafka/client')
var passport = require('passport')
var requireAuth = passport.authenticate('jwt',{session : false})


router.post('/',function(req,res){
    console.log("in  get profile viewsmmmm")
    //console.log("req")

   console.log(req.body);
       
        kafka.make_request("getProfileviews",req.body,function(err,result){
            if(err)
            {
                console.log("Unable to get Profileviews",err);
                res.writeHead(400,{
                    'Content-type' : 'text/plain'
                })
                res.end('Error in fetching Profileviews')
            }
            else{
                console.log("fetched all top Profileviews"+result)
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
             
                const graph = [];
                var myMap = new Map();
                
                var options = { month: 'long', day: 'numeric' };
                
                console.log("after filer");
                console.log(result);

            for (let d in result) {

          let day = (new Date(result[d].dateViewed).toLocaleDateString("en-US", options));
            if(myMap.has(day)) {
                myMap.set(day ,myMap.get(day)+ 1);
            }
            else {
                myMap.set(day , 1);
            }

        
        }


        var date = new Date();

        for (i = 0; i < 29; i++) { 
            myMap.set( new Date(date.setDate(date.getDate() - 1)).toLocaleDateString("en-US", options), 0);
          }

 
          for (let d in result) {

            let day = (new Date(result[d].dateViewed).toLocaleDateString("en-US", options));
              if(myMap.has(day)) {
                  myMap.set(day ,myMap.get(day)+ 1);
              }
              else {
                  myMap.set(day , 1);
              }
  
          
          }







        for (var [key, value] of myMap) {

            let label = key;
           let y = value;

                const data = {
            label,y
          }
          
              graph.push(data)
          }
       
    
        console.log("graph");
      //  console.log(graph);

        let results = {
            graph : graph
        }
console.log(graph)


                res.end(JSON.stringify(results));
            }
        })
   // }
})

module.exports = router