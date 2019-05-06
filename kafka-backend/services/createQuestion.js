var Model = require('../config/MongoConnection')
var mongooseTypes = require('mongoose').Types;
function handle_request(message,callback){
    console.log("Inside Kafka create question",message);
    var Question =  Model.QuestionsModel({
        Question : message.body.Question,
        QuestionOwner : message.body.QuestionOwner,
        Topics : message.body.Topics,
        PostedTime : message.body.PostedTime
    })
    console.log("Question is :"+Question)
    Question.save()
    .then(res => {
        console.log("Success response"+res)

        var activity = Model.ActivityModel ({
            action : "question",
            owner_email : message.body.QuestionOwner,
            question : {
                Question : message.body.Question,
                QuestionOwner : message.body.QuestionOwner,
                Topics : message.body.Topics
            }
        })

        activity.save();

        Model.UserModel.findOne({"Email":message.body.QuestionOwner},(err,user)=>{
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

        })
        
    })
    .catch(err=> {
        console.log("Error in response"+err)
        callback(err,null)
    })
       
}

exports.handle_request =  handle_request