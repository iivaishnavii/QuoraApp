var Model = require('../config/MongoConnection')

function handle_request(message,callback){
    console.log("Inside kafka user bookmarks",message);
    Model.UserModel.findOne({
        'Email' : message.body.Email
    },(err,user)=>{
        if(err)
        {
            console.log("Unable to fetch user details",err)
            callback(err,null)
        }
        else
        {
       callback(null,user.AnswersBookmarked)

        }
    })
}

exports.handle_request =  handle_request