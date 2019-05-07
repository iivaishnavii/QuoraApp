var Model = require('../config/MongoConnection')



function handle_request(message,callback)
{
     
    console.log("Inside handle requests of profile views:")
    console.log(message.Email);
     Model.UserModel.findOne({Email : message.Email}, function(err,result){

        if(err) 
        callback(err,null);

        if(result) {
         console.log(result)
         if(result.views) {
            callback(null,result.views);
         }
         else {
            callback(null,[]);
         }
      
        }
        else {
            console.log(result)
            callback(null,null);  
        }

    })
    }

exports.handle_request = handle_request