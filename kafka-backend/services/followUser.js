var Model = require('../config/MongoConnection')

function handle_request(message,callback){
    console.log("Inside Kafka follow topic",message);
//email : current , followEmail : whomToFollow
    Model.UserModel.findOne({
        'Email' : message.body.email
    },(err,user)=>{
        if(err)
        {
            console.log("Unable to fetch user details",err)
            callback(err,null);
        }
        else
        {
        console.log("The user is" + user)
        Model.UserModel.findOne({
            'Email' : message.body.followEmail
        }, (err,userToFollow) => {
            if(err) {
                console.log("User not found");
            } else {
                console.log(userToFollow);
                user.Following = user.Following || [];
                user.Following.push(userToFollow.Name);
                userToFollow.Followers = userToFollow.Followers || [];
                userToFollow.Followers.push(user.Name);
            }
            userToFollow.save().then((doc)=>{
                console.log("Topic added successfully",doc)
                user.save().then((d)=>{
                    console.log("Topic added successfully",d)
                    callback(null,d)
                },(err)=>{
                    console.log("Unable to follow topic",e)
                    callback(err,null)
                })
               // callback(null,doc)
            },(err)=>{
                console.log("Unable to follow topic",err)
               // callback(err,null)
            })
            
            
        })
      
        }
    })
}

exports.handle_request =  handle_request