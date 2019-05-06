var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
//var Model = require("../app/api/models/users")
const secret = "CMPE273Canvas"
module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        console.log("Payload"+jwt_payload.userid)
        Model.Userdetails.findOne({
            'userid' : jwt_payload.userid
        },(err,res)=>{
            if(res)
            {
                console.log(res)
                var user = res;
                delete user.password;
                callback(null,user)
            }
            else
            {
                console.log(err)
                callback(err,false)
            }
        })
    }));
};