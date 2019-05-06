var Model = require('../config/MongoConnection')

function handle_request(message, callback){
    console.log('In kafka request for writing answer ', message);
    Model.UserModel.findOne({"Email":message.body.owner},function(err,user)
    {
        
       // var imageOfUser = user.ProfilePicture
        var answer = Model.AnswerModel({
            answer : message.body.answer,
            owner : message.body.owner,
            isAnonymous:message.body.isAnonymous,
            date:message.body.date,
            question:message.body.question,
           // images : imageOfUser
        })
        user.QuestionsAnswered =  user.QuestionsAnswered || []
        user.QuestionsAnswered.push(answer)
        console.log("User retrieved is"+user)
        user.save().
        then(res=>console.log(res))
        .catch(err=>console.log(err))

        answer.save()
        .then(response =>{

            var activity = Model.ActivityModel ({
            action : "answer",
            owner_email : message.body.owner,
            question : {
                 Question : message.body.question
            }
            });

            activity.save();


            Model.QuestionsModel.findOne({"Question":message.body.question},(err,question)=>{
                console.log("I am Ques"+question)
                question.Answers.push(answer)
                console.log("followers");
                console.log(question.Followers);
                for(var i in question.Followers) {
                //    console.log("email" + email);

                        Model.UserModel.findOne({"Email": question.Followers[i]},(err,user) => {
                            if(user) {
                            var notification = {
                                answerOwner : message.body.owner,
                                question :  message.body.question,
                                action : 'answer',
                                postedTime : new Date(),
                                read : false
                            }
                        
                            user.notifications = user.notifications || [];
                            user.notifications.push(notification);
                            user.save()
                        }
                        })
                }
                
                question.save().
                then(res=>{
                    callback(null,res)
                })
                .catch(err=>callback(err,null))
            })
        })


    })

}
exports.handle_request = handle_request;
