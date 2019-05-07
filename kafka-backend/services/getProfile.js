var Model = require('../config/MongoConnection')


function handle_request(message,callback){
    console.log("Inside Kafka get Profile",message);
    Model.UserModel.findOne({
        'Email' : message.params.email
    },(err,user)=>{
        if(user)
        {
            var views = {
             dateViewed : new Date()
            }
            user.views = user.views || []
            user.views.push(views);
            user.save().then((doc) => {
                console.log("user saved with views")
            })
            callback(null,user)
        }
        else
        {
            callback(err,null)
        }
    
    })
}

exports.handle_request =  handle_request