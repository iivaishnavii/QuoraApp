var Model = require('../config/MongoConnection')


function handle_request(message,callback){
    console.log("Inside get answers request");
    Model.QuestionsModel.findById({
        "_id" : message.params.ID
    },(err,question)=>{
        console.log("Questioneee"+question)
        if(question)
        {
            callback(null,question)
        }
        else
        {
            callback(err,null)
        }
    
    })
}

exports.handle_request =  handle_request

