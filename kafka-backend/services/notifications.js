var Model = require('../config/MongoConnection')

function handle_request(message,callback){
    console.log("Inside Kafka get notifications",message);
//email : currentUser 
console.log(message.email);
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
        callback(null, user.notifications);      
      
        }
    })
}

exports.handle_request =  handle_request