var Model = require('../config/MongoConnection')

function handle_request(message, callback){
    console.log('Create Conversation ', message);
 console.log("first time")


var mesg = new Model.ConverstionModel({
    From: message.From,
    To: message.To,
    Subject: message.Subject,
    messages: [{
        from: message.From,
        text: message.msg, 
    }]   
})

mesg.save().then((doc) => {
console.log(" Added successfully.", doc);
callback(null, doc);
}, (err) => {
console.log("Unable to add Submission", err);
callback(err, null);
}); 
}
exports.handle_request = handle_request;