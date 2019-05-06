var Model = require('../config/MongoConnection');
var bcrypt = require('bcrypt-nodejs');



function handle_request(msg, callback){
    console.log('Inside  Kafka Backend Login');
    console.log('Message', msg);

    Model.UserModel.findOne({
        'Email': msg.Email
    }, (err, user) => {

        if (err) {
            console.log("Unable to fetch user details.", err);
            callback(err, null);
        }
        else {

            if(user){
                console.log("User exists ");
                var hash = user.Password;
                console.log(hash);
                bcrypt.compare(msg.password,hash,function(err,doesMatch){
                    if(doesMatch){
                        console.log("Inside result.length",user.Email);
                        callback(null,user);
                    } else {
                        callback(null,[]);
                    }
                });
             
                
            }
            else{
                console.log("user doesn't exist")
                callback(null, null);
            }
            

        }

    });
}

exports.handle_request = handle_request;


// var bcrypt = require('bcrypt-nodejs');
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://mongodeep:mongo123@cluster0-p49b1.mongodb.net/test?retryWrites=true";

// var jwt = require('jsonwebtoken');


// function handle_request(msg, callback){
//     var res = {};
//     console.log("In handle request:"+ JSON.stringify(msg));
//     MongoClient.connect(uri,[{nativeParser : true}],function(err, db){
//     if (err) { throw new Error('Could not connect: '+err); }
   
//             console.log('Connected to mongodb');
//             console.log(msg);
//             var query = {
//                 email : msg.email

//             };

//             var user = {
//                 email: msg.email
//             };
    
//             var dbo = db.db('canvas');
//             dbo.collection("USER_DETAILS").find(query).toArray(function(err,result){
//                 if(err)
                    
//                     callback(err,"Error");
                

//                 console.log(result);
//                 if(result.length > 0){
       
//                            // callback(null,result);
//                 }
//                 else{
//                     callback(null,[]);
//                 }
//             });
//             db.close();
//         });   
          



// }
// exports.handle_request = handle_request;