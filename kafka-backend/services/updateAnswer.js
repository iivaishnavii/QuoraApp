var Model = require('../config/MongoConnection')

function handle_request(message,callback){
    console.log("Inside Kafka update answer",message);
    Model.UserModel.findOne({
        'Email' : message.body.Email,
        'QuestionAnswered' :  {
        $elemMatch : {
            'question_id' : message.body.question_id,
            'answer_id' : message.body.answer_id
        }
    }


    },(err,user)=>{
        if(err)
        {
            console.log("Unable to fetch user details",err)
            callback(err,null)
        }
        else
        {
        console.log("The user is"+user)

        var set = {
            answer : req.answer,
            date : req.date
        }

        const answer = user.QuestionAnswered.id(answer_id); 
        answer.set(set);

        
      
        user.save().then((doc)=>{
            console.log("Answer updated successfully",doc)
            callback(null,doc)
        },(err)=>{
            console.log("Unable to save answer",err)
            callback(err,null)
        })
        }
    })
}

exports.handle_request =  handle_request