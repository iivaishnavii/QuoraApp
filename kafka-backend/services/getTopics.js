var Model = require('../config/MongoConnection')



function handle_request(message,callback)
{
     
    console.log("Inside handle requests of bookmark answers:"+message.params.email)
     Model.UserModel.findOne({"Email":message.params.email},
        (err,user)=>{
            // var answerid = message.body.answerid;
            if(user)
        {
            console.log(user.Topics)
            callback(null,user.Topics)
        }
        else
        {
            callback(err,null)
        }
           
            })
        
        }

exports.handle_request = handle_request