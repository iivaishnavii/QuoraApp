var Model = require('../config/MongoConnection')


function handle_request(message,callback){
    console.log("Inside Kafka get Profile",message);
    Model.UserModel.findOne({
        'Email' : message.params.email
    },(err,user)=>{
        if(user)
        {
            callback(null,user)
        }
        else
        {
            callback(err,null)
        }
    
    })
}

exports.handle_request =  handle_request