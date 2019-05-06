var Model = require('../config/MongoConnection')

function handle_request(message, callback){
  Model.QuestionsModel.find({"Question":{'$regex':message.params.question,'$options':'i'}},{'Question':1,'_id':0},function(err,question){
        if(question)
        {
            callback(null,question)
        }
        else
            callback(err,null)
  })
}
exports.handle_request = handle_request;