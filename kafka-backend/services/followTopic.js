var Model = require('../config/MongoConnection')

function handle_request(message,callback){
    console.log("Inside Kafka follow topic",message.body);
   // follow using topic name
    Model.TopicsModel.findOne({
        topicName :
        message.body.topicName 
    },(err,topic)=>{
        if(err)
        {
            console.log("Unable to fetch user details",err)
            callback(err,null)
        }
        else
        {
        console.log("The topic is" + topic)
        Model.UserModel.findOne({
           Email : message.body.Email
        }, (err,user) => {
            if(err) {
                console.log("User not found");
            } else {
                user.Topics = user.Topics || [];
                user.Topics.push(topic);
            }
            user.save().then((doc)=>{
                console.log("Topic added successfully",doc)
                callback(null,doc)
            },(err)=>{
                console.log("Unable to follow topic",err)
                callback(err,null)
            })
        })
      
      
        }
    })
}

exports.handle_request =  handle_request