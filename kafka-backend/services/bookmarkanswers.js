var Model = require('../config/MongoConnection')


function handle_request(message,callback)
{
   
    console.log("Inside handle requests of bookmark answers:"+message.body.Email)
    var y=message.body.Email
   console.log(typeof(y))
        Model.UserModel.findOne({"Email":message.body.Email},
        (err,user)=>{
            var answer = message.body.answer;
            
            if(user)
            {
                console.log("user:",user)
                Model.AnswerModel.findOne({"_id":message.body.answerid},
                        (err,answer)=>{
                            if(answer)
                            {
                                user.AnswersBookmarked = user.AnswersBookmarked || []
                                console.log("user.bookmarkedanswers:",user.AnswersBookmarked)
                                console.log("answer:",answer)
                                user.AnswersBookmarked.push(answer)
                                
                                user.save().then(doc=>
                                    {
                                        console.log( "doc:", doc)
                                        callback(null,doc)
                                    },
                                    (err)=>{
                                        console.log("Unable to save assignment details",err)
                                        callback(err,null);
                                    })   

                                }
                                else
                                {
                                    callback(err,null)
                                }

                                          })
  
                            }
        else
            {
                callback(err,null)
            }


                        })
  
                            
                            }
      
          
    

exports.handle_request = handle_request