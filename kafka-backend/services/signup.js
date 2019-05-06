var Model = require('../config/MongoConnection');
var bcrypt = require('bcrypt-nodejs');
var mongooseTypes = require('mongoose').Types;
var saltRounds = 10
var mysql = require('mysql')
var dbConnection = require('./mysql_conncetion.js').mysql_connection;

var table = "new_table"
//var connection = null;

function handle_request(message,callback){
    console.log("In Sign up "+message.Email)
    
    //const profileId = mongooseTypes.ObjectId();
 
    Model.UserModel.findOne({
        'Email' : message.Email
    },(err,user) => {
        if(err)
        {
            console.log("Unable to fetch use details",err)
            callback(err,null)
        }
        else
        {
            if(user)
            {
                console.log('User Exists',user)
                callback(null,null)                
            }
            else
            {
                const hashedPassword = bcrypt.hashSync(message.Password)
                var user = new Model.UserModel({
                    Name : message.Name,
                    Email : message.Email,
                    Password : hashedPassword
                  
                    
                })
            }
                console.log("User document"+user.Name)
                
                user.save().then((doc)=>{
                    console.log("Success response"+doc)
                    callback(null,doc);
                }, (err)=>{
                    console.log("Unable to save user details",err)
                    callback(err,null);
                })
            }
        }
    
    )
function handle_request(message, callback){

    
//     console.log('Inside Backend Signup');
//     console.log('Message: ', message);
//     connection = mysql.createConnection({
//     host     : 'localhost',
//     database : 'Quora',
//     user     : 'root',
//     password : 'password',
//     port:3306,
//   })
var Name = message.Name;
 var Email = message.Email;
 var Password =bcrypt.hashSync(message.Password);
 var query1 = `INSERT INTO ${table} (name, email, password) VALUES ("${Name}", "${Email}", "${Password}")`;
dbConnection.query(query1,(err,results,fields)=>{
    if (err){
        console.log(err);
        callback(err,null)
    }
    else{
        console.log("Created Student") ;
        console.log(results);  
        callback(null,"successfull")
    }

});




// dbConnection.connect((err)=> {
//     if (err) {
//         console.log(err)
//         throw err;
//     }  
//     else{
//         console.log("Successful SQL Connection");
//         var Name = message.Name;
//  var Email = message.Email;
//  var Password =hashed_password
//  var query1 = `INSERT INTO Users (name, email, password) VALUES ("${Name}", "${Email}", "${Password}")`;
//  connection.query(query1, function (error, results, fields) {
//     if (error)
//     {
//         res.writeHead(400,{
//             'Content-Type' : 'application/text'
//         })
//         res.end(error.toString())
//         throw error;
//     }
//     else
//     {
//         console.log("Created Student")   
//     }
    
// });
//     }
//    });


//  var Name = message.Name;
//  var Email = message.Email;
//  var Password =hashed_password
//  var query1 = `INSERT INTO Users (name, email, password) VALUES ("${Name}", "${Email}", "${Password}")`;
//  connection.query(query1, function (error, results, fields) {
//     if (error)
//     {
//         res.writeHead(400,{
//             'Content-Type' : 'application/text'
//         })
//         res.end(error.toString())
//         throw error;
//     }
//     else
//     {
//         console.log("Created Student")   
//     }
    
// });

    // const hashedPassword = bcrypt.hashSync(message.Password)
    // var SignUp = Model.UserModel({
    //         Name : message.Name,
    //         Password : hashedPassword,
    //         Email : message.Email 
    // })
    // console.log("SignUp"+SignUp)
    // var promise = SignUp.save()
    // console.log("Promise"+promise)
    // promise.then(res=>{
    //     res.value= message
    //     res.code = 200
    //     console.log("Ressss"+res)
    //     callback(null,res)
    // })
    // .catch(err=>{
    //     if(err.message.includes("Duplicate Key"))
    //     {
    //         res.value = "User Exists"
    //     }
    //     else 
    //     {
    //         res.value = "Error in registering data please try again!";
    //         res.code = "400";
    //         callback(null, res);
    //     }
    // })



}}

exports.handle_request = handle_request;