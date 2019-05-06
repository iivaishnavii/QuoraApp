var Model = require('../config/MongoConnection');
var bcrypt = require('bcrypt-nodejs');
var mongooseTypes = require('mongoose').Types;
var saltRounds = 10
var mysql = require('mysql')

var mysql_connection = mysql.createConnection({
    host     : 'localhost',
    database : 'Quora',
    user     : 'root',
    password : 'password',
    port:3306,
  })
  
  mysql_connection.connect((err)=>{
      if(err){
        console.log(err);
      }else{
        console.log("Connection has benn established");
      }
  })

  exports.mysql_connection = mysql_connection ;



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

 

