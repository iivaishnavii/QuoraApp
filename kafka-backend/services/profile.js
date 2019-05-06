var Model = require('../config/MongoConnection')


function handle_request(message,callback){
    console.log("Inside Kafka Update Profile",message);
    Model.UserModel.findOne({
        'Email' : message.params.email
    },(err,user)=>{
        if(err)
        {
            console.log("Unable to fetch user details",err)
            callback(err,null)
        }
        else
        {
        console.log("The user is"+user)
        user.Name = message.body.Name
        user.City = message.body.City
        user.State = message.body.State
        user.ZipCode = message.body.ZipCode
        user.Profile = message.body.Profile
        user.Education = message.body.Education
        user.CareerInformation = message.body.CareerInformation
        user.Description = message.body.Description
        user.ProfileCredential = message.body.ProfileCredential
//user.Email =  message.body.Email
      //  user.Password = message.body.Password
       // user.ProfilePicture = message.body.ProfilePicture
        user.save().then((doc)=>{
            console.log("User updated successfully",doc)
            callback(null,doc)
        },(err)=>{
            console.log("Unable to save user details",err)
            callback(err,null)
        })
        }
    })
}

exports.handle_request =  handle_request