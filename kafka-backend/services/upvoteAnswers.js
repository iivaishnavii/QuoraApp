var Model = require('../config/MongoConnection')



function handle_request(message,callback)
{
     
    console.log("Inside handle requests of upvote answers:"+message.body.answerid+message.body.questionid)
     Model.AnswerModel.findOne({"_id":message.body.answerid},
        (err,answer)=>{
            var answerid = message.body.answerid;
            console.log(message.body.questionid)
            if(answer)
            {
                console.log("answer:",answer)
                answer.upVotes = answer.upVotes + 1
                console.log(answerid)
                console.log("answer.upvotes:",answer.upVotes)
                console.log(Number(answerid))
      
                Model.QuestionsModel.findById({"_id":message.body.questionid},
                        (err1,question)=>{
                    if(question)
                        {
                            // console.log("question:",question)
                            // answer.upVotes = answer.upVotes + 1
                            question.Answers.forEach(element => {
                                console.log("element.upVotes",element.upVotes,"element.answerid:",element._id,"messgage.body.answerid:",message.body.answerid)
                                elementid_str= String(element._id)
                                if(elementid_str===answerid){
                                    element.upVotes= element.upVotes + 1
                                    console.log("element.upVotes inside:",element.upVotes)
                                }
                                
                            });
                            question.save().then(doc1=>{
                                console.log("doc1")
                            },(err)=>{
                                console.log("Unable to save assignment details",err)

                            })
                        }
                        if(err1){
                            console.log("error:",err1)
                        }
                    
                })
                    
            answer.save().then(doc=>
                {
                    console.log( "doc:", doc)
                    callback(null,doc)
                },
                (err)=>{
                    console.log("Unable to save assignment details",err)
                    callback(err,null);
                })   
            }
                })
            
        
        }

exports.handle_request = handle_request