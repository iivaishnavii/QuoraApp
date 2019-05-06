var Model = require('../config/MongoConnection')

//Get a particular course
function handle_request(message, callback){
    console.log('Inside Kafka Method Get messages. Message ', message);
     // get convo for user using subject id 
     // id : currentUser , sub : Subject
        Model.ConverstionModel.findOne({
            $or: [{$and:[{"From":message.id},{"Subject":message.sub}]},{$and:[{"To":message.id},{"Subject":message.sub}]}]
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
                callback(null,convo);
            }
        });
}

exports.handle_request = handle_request;


