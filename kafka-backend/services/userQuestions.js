var Model = require('../config/MongoConnection')

function handle_request(message,callback){
    console.log("Inside kafka user questions",message);
    Model.UserModel.findOne({
        $or : [
            {'Email' : message.email},
            {
            'Questions' : {
                $elemMatch: {
               // 'Topics' : [{ $regex: '/'+message.topic+'/', $options: 'i' }]
               'Topics' : [message.topic]
                }
            }}]
    },(err,user)=>{
        if(user)
        {
        
            callback(null,user)
        }
        else
            callback(err,null)  
        
    })
}

exports.handle_request =  handle_request