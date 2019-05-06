var Model = require('../config/MongoConnection')

function handle_request(message,callback){
    console.log("Inside Kafka get followers",message);
//email : currentUser 
    Model.UserModel.findOne({
        'Email' : message.email
    },(err,user)=>{
        if(err)
        {
            console.log("Unable to fetch user details",err)
            callback(err,null)
        }
        else
        {
        console.log("The user is" + user)
        callback(null, user.followers);      
      
        }
    })
}

exports.handle_request =  handle_request