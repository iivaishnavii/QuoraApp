var Model = require('../config/MongoConnection')



function handle_request(message,callback)
{
     
    console.log("Inside handle requests of top views:")
     Model.AnswerModel.find({},null,{sort : {views : -1}, limit : 10} , function(err,result){

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