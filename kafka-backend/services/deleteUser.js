
var Model = require('../config/MongoConnection')

//Get convos for a user
function handle_request(message, callback){
    // get inbox contents for user using email of user
    console.log('Inside Kafka Method delete User', message);
    Model.UserModel.findOne({ Email : message.params.email  }, function (err, user) {
            if (err) {
                console.log("Error", err);
                callback(err,null)
            }
            else {
                if(user!=null)
                {
                user.remove()
                .then(res => {
                    //res.end("User deleted")
                    callback(null,res)
                })
                .catch(err => {
                    //res.end("Error")
                    callback(err,null)
                })
            }
            else
            {
                
                res = 'User Not found'
                callback(null,res)
            }

            }
        });
}

exports.handle_request = handle_request;
