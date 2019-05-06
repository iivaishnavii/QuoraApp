var Model = require('../config/MongoConnection')


function handle_request(message,callback){
    console.log("Inside Kafka get all activities",message);
    Model.ActivityModel.find({ owner_email : message.body.email },(err,activity)=>{
        if(activity)
        {
            callback(null,activity)
        }
        else
        {
            callback(err,null)
        }
    
    })
}

exports.handle_request =  handle_request