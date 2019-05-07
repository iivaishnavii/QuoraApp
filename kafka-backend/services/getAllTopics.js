var Model = require('../config/MongoConnection')



function handle_request(message,callback)
{
     
    console.log("Inside kafka handle requests of get all topics")
     Model.TopicsModel.find({},
        (err,topics)=>{
            // var answerid = message.body.answerid;
            if(topics)
        {
            console.log(topics)
            callback(null,topics)
        }
        else
        {
            callback(err,null)
        }
           
            })
        
        }

exports.handle_request = handle_request