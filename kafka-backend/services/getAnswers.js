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

                Model.AnswerModel.findOne({_id : _id},(err,ans) => {
                   if(err) {
                       console.log("error in fectching answer");
                   }
                    if(ans) {

                            console.log(ans);
                        ans.views = ans.views+1;
                        ans.save().then((doc)=>{
                            console.log("Answer updated successfully",doc)
                           
                        },(err)=>{
                            console.log("Unable to save answer",err)
                          
                        })
                    }
                   
                } )
                
            }

            question.save().then((doc)=>{
                console.log("question updated successfully",doc)
                
            },(err)=>{
                console.log("Unable to save question",err)
              
            })
            callback(null,question)


        }
        else
        {
            callback(err,null)
        }
    
    })
}

exports.handle_request =  handle_request

