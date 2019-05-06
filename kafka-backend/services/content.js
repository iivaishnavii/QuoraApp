var Model = require('../config/MongoConnection')

function handle_request(message,callback){
    console.log("Inside  kafka get content service",message);
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
       callback(null,user)

        }
    })
}

exports.handle_request =  handle_request