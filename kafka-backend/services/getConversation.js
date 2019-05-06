
var Model = require('../config/MongoConnection')

//Get convos for a user
function handle_request(message, callback){
    // get inbox contents for user using email of user
    console.log('Inside Kafka Method get Conversation  Message ', message);
    Model.MessageModel.find({
            $or: [{"From": message.id}, {"To": message.id}]
        }, function (err, convo) {
            if (err) {
                console.log("Error", err);
                res.writeHead(400, {
                    'Content-type': 'text/plain'
                });
                res.end('Error - Course');
            }
            else {
                console.log(convo);
                callback(null, convo);
            }
        });
}

exports.handle_request = handle_request;
