var Model = require('../config/MongoConnection')
var mongooseTypes = require('mongoose').Types;
function handle_request(message,callback){
    console.log("Inside Kafka create question",message);
    var Topic =  Model.TopicsModel({
        topicName : message.body.topic,
    followers : 1,
    questions : []
    })
    console.log("Topic  is :"+Topic)
    Topic.save()
    .then(res => {
        console.log("Success response"+res)
        callback(err,res)
       /* Model.UserModel.findOne({"Email":message.body.QuestionOwner},(err,user)=>{
            console.log("user is"+user)
            if(user)
            {
                user.Questions.push(Question)
                user.save()
                .then(resu => callback(null,resu))
                
            }
            else
            {
                callback(err,res)
            }

        }) */
        
    })
    .catch(err=> {
        console.log("Error in response"+err)
        callback(err,null)
    })
       
}

exports.handle_request =  handle_request