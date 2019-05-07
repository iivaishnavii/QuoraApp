var Model = require('../config/MongoConnection')


function handle_request(message,callback){
    console.log("Inside get answers request");
    Model.QuestionsModel.findById({
        "_id" : message.params.ID
    },(err,question)=>{
        console.log("Questioneee"+question)
        if(question)
        {
      
            for(q in question.Answers) {
                question.Answers[q].views = question.Answers[q].views+1;
                let _id = question.Answers[q]._id;

                Model.AnswerModel.find({_id : _id},(err,answer) => {
                   if(err) {
                       console.log("error in fectching answer");
                   }
                    if(answer) {
                        answer.views = answer.views+1;
                        answer.save();
                    }
                   
                } )
                
            }

            question.save();
            callback(null,question)


        }
        else
        {
            callback(err,null)
        }
    
    })
}

exports.handle_request =  handle_request

