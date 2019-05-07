var Model = require('../config/MongoConnection')



function handle_request(message,callback)
{
     
    console.log("Inside handle requests of top downvotes:")
     Model.AnswerModel.find({},null,{sort : {downVotes : -1}, limit : 5} , function(err,result){

        if(err) 
        callback(err,null);

        if(result) {
         console.log(result)
         callback(null,result);
        }
        else {
            console.log(result)
            callback(null,null);  
        }

    })
    }

exports.handle_request = handle_request