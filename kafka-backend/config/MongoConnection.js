const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema; 


mongoose.connect("mongodb+srv://quora:quora@cluster0-6ddbb.mongodb.net/QuoraApp?retryWrites=true", {poolSize: 100} 
)
.then(() => {

    console.log('Database connection successful')
  })
  .catch(err => {
    console.log(err);
    console.error('Database connection error')
  })

  var ImgSchema = new Schema({
    img: { data: Buffer, contentType: String}
  }, {
    timestamps: true
  });

  var AnswerSchema = new Schema({
    answer: { type: String, trim: true},
    owner: { type: String, trim: true },
    images: [ImgSchema],
    imageURL : String,
    isAnonymous: { type: Boolean, trim: true },
    upVotes: { type: Number, trim: true, default: 0 },
    downVotes: { type: Number, trim: true, default: 0 },
    comments: { type: Array, trim: true, default: "" },
    date : { type: String, trim: true, default: "" },
    question : { type: String, trim: true, default: "" },
    views : {type : Number, default: 0},
    bookmarks : {type : Number, default: 0}
})

  var QuestionsSchema = new Schema({
    Question: { type: String, trim: true},
    QuestionOwner:{ type: String, trim: true },
    Topics: { type: Array, trim: true, default: "" },
    Followers: { type: Array, trim: true, default: "" },
    Answers: [AnswerSchema],
    PostedTime : { type: String, trim: true, default: "" }
    
})

  var UserSchema = new Schema({
    Name: { type: String, trim: true},
    City: { type: String, trim: true },
    State: { type: String, trim: true },
    ZipCode: { type: String, trim: true, default: "" },
    Profile: { type: String, trim: true, default: "" },
    Education: { type: String, trim: true, default: "" },
    CareerInformation: { type: String, trim: true, default: "" },
    Description: { type: String, trim: true, default: "" },
    ProfileCredential: { type: String, trim: true, default: "" },
    Questions: [QuestionsSchema],
    QuestionsFollowed: { type: Array, trim: true },
    AnswersBookmarked : {type :Array,trim:true},
    Topics : {type:Array},
    Followers : {type:Array},
    Following : {type:Array},
    ProfileViews : {type:Number},
    QuestionsAnswered:{type:Array},
    Email: { type: String, trim: true, default: 0 },
    Password: { type: String, trim: true, default: "" },
    ProfilePicture : {type:Buffer},
    notifications : {type : Array},
    views : {type : Array}
})



var ConversationSchema = new Schema({
    From: { type: String, trim: true},
    To:{ type: String, trim: true },
    Subject: { type: String, trim: true },
    messages: { type: Array, trim: true, default: "" }

    

})

const messageSchema = new mongoose.Schema([{
  id1: String,
  id1name: String,
  id2: String,
  id2name: String,
  sub: String,
  msg: [{
      from: String,
      text: String,
      time: String
  }]
}])




var TopicsSchema = new Schema({
    topicName : { type: String, trim: true},
    followers : {type : Number},
    questions : {type : String}
})

var ActivitySchema = new Schema({
  action : {type: String,trim : true},
  owner_email : {type : String},
  question : {type : Array},
  following : {type : Array}
},
  {timestamps: true})





var QuestionsModel = mongoose.model('Question',QuestionsSchema)
var UserModel =  mongoose.model('Users',UserSchema)
var AnswerModel =  mongoose.model('Answer',AnswerSchema)
var ConverstionModel = mongoose.model('Converstion',ConversationSchema)
var TopicsModel = mongoose.model('Topics',TopicsSchema)
var ActivityModel = mongoose.model('activity', ActivitySchema)
var MessageModel = mongoose.model('Messages', messageSchema)
var Img = mongoose.model('Img',ImgSchema)

module.exports={
    UserModel,
    AnswerModel,
    ConverstionModel,
    QuestionsModel,
    TopicsModel,
    ActivityModel,
    MessageModel,
    Img
}