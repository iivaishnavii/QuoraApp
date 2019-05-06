var Model = require('../config/MongoConnection')

function handle_request(message, callback){
  console.log("Inside search topic")
  console.log(message.topic);
  Model.TopicsModel.find({"topicName":{'$regex': message.topic,'$options':'i'}},function(err,topic){
        if(topic)
        {
          console.log("topic found")
          console.log(topic);
            callback(null,topic)
        }
      
        else {
          console.log("topic not found")
            callback(err,null)
        }
  })
}
exports.handle_request = handle_request;