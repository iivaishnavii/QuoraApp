var Model = require('../config/MongoConnection')



function handle_request(message,callback)
{
    console.log("message:", message.body.email)
    Model.UserModel.findOne({"Email":message.body.email},(err,user)=>{
        if(user){
        const userdetails = {
            username : user.Name,
            comment : message.body.comment
                            }
                            var answerid = message.body.answerid;
                            user.AnswersBookmarked.forEach(element => {
                                console.log("user :: element.comments",element.comments,"element.answerid:",element._id,"messgage.body.answerid:",message.body.answerid)
                                 elementid_str= String(element._id)
                                 if(elementid_str===answerid){
                                  element.comments = element.comments || []
                                  element.comments.push(userdetails)
                                  console.log("user :: element.comment inside:",element.comments)
                                 }    
                             });
                             user.save().then(doc1=>{
                                 console.log("doc1 user")
                             },(err)=>{
                                 console.log("Unable to save assignment details",err)
 
                             })
                        
                            console.log("Inside handle requests of addcomments answers:"+message.body.answerid," ",message.body.questionid)
                            Model.AnswerModel.findOne({"_id":message.body.answerid},
                               (err,answer)=>{
                                   
                                   console.log(message.body.questionid)
                                   if(answer)
                                   {
                                       console.log("answer:",answer)
                                       answer.comments = answer.comments || []
                                       answer.comments.push(userdetails)
                                     
                                       Model.QuestionsModel.findOne({"Question": answer.question},
                                               (err1,question)=>{
                                           if(question)
                                               {
                                                   question.Answers.forEach(element => {
                                                      console.log("element.comments",element.comments,"element.answerid:",element._id,"messgage.body.answerid:",message.body.answerid)
                                                       elementid_str= String(element._id)
                                                       if(elementid_str===answerid){
                                                        element.comments = element.comments || []
                                                        element.comments.push(userdetails)
                                                        console.log("element.comment inside:",element.comments)
                                                       }
                                                       
                                                   });
                                                   question.save().then(doc1=>{
                                                       console.log("doc1 question")
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
    if(err){
            callback(err,null)
            }
})
    
 
            
        
        }

exports.handle_request = handle_request