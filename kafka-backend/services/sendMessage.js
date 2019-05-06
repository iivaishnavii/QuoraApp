var Model = require('../config/MongoConnection');

function handle_request(message, callback){
    //from : currentuser , to : messageToSend

    console.log('Create Message', message);
    console.log(message);
    const msgs = {
        from: message.from,
        text: message.text,
        
    }

    Model.ConverstionModel.findOne({ 
        $or: [{ $and: [{ "From": message.from }, { "To": message.to }, { "Subject": message.sub }] },
         { $and: [{ "From": message.to }, { "To": message.from }, { "Subject": message.sub }] }] }, 
         function (err, mesg) {
            if (err) {
                console.log("Error", err);
                
            }
            else {
                console.log("Before", mesg.messages);
                mesg.messages = mesg.messages || [];
                mesg.messages.push(msgs);
                console.log("After", mesg.messages);  
                mesg.save().then((doc) => {

                    console.log("Message details Updated successfully.", doc);
                    callback(null, doc);
        
                }, (err) => {
                    console.log("Unable to save Message details.", err);
                    callback(err, null);
                });
                callback(null,mesg);

            }
        }); 
       
    
}

exports.handle_request = handle_request;




