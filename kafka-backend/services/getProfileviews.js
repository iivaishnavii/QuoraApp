var Model = require('../config/MongoConnection')



function handle_request(message,callback)
{
     
    console.log("Inside handle requests of profile views:")
    console.log(message.Email);
     Model.UserModel.aggregate([
        
        {$match: { Email:message.Email}},
        {$group: {_id :{
            day: { $dayOfMonth: "$views.dateViewed" }
           
        
        }
        }
        
    }
    ], function(err,result){

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