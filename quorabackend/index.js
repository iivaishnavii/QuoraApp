var express = require('express')
var app = express()
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
//Passport Authentication
var passport = require('passport');
var multer = require('multer');
var Model = require('../kafka-backend/config/MongoConnection');
global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64');
};
}

if (typeof atob === 'undefined') {
global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary');
};
}

app.use(session({
    secret: 'cmpe-273-quora-app',
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 100,
    activeDuration: 5 * 60 * 100
  }));
app.use(cors({origin:'*',credentials:true}))

require('./config/passport')(passport);

  
app.use(bodyParser.json())


var login = require('./routes/login.js')
var signUp = require('./routes/signUp.js')
var profile = require('./routes/updateProfile.js')


var following = require('./routes/following.js')
var userAnswers = require('./routes/userAnswers.js')
var userQuestions = require('./routes/userQuestions.js')
var getBookmarks = require('./routes/getBookmarks.js')
var updateAnswer = require('./routes/updateAnswer.js')
var notifications = require('./routes/notifications')

const createConversation = require('./routes/createConversation');
const getConversation = require('./routes/getConversation');
const getMessage = require('./routes/getMessage');
const createMessage = require('./routes/sendMessage');
const followTopic = require('./routes/followTopic');
const followUser = require('./routes/followUser');
const getFollowers = require('./routes/getFollowers');
const content = require('./routes/content');
const topDownvotes = require('./routes/topDownvotes')
const topUpvotes = require('./routes/topUpvotes.js');
const topViews = require('./routes/topViews')
const topBookmarks = require('./routes/topBookmarks')
const getProfileviews = require('./routes/getProfileviews')
const searchTopicContent = require('./routes/searchTopicContent')
const deleteUser = require('./routes/deleteUser')
const getProfile = require('./routes/getProfile')
const getAllQuestions = require('./routes/getAllQuestions')
const createQuestion = require('./routes/createQuestion')
const getAnswers = require('./routes/getAnswers')
//var writeAnswer = require('./routes/writeAnswer')
var followQuestion = require('./routes/followQuestion')
var searchQuestion = require('./routes/searchQuestion')
const getUserFollowingData = require('./routes/getUserFollowingData')
var signUp = require('./routes/signUp.js')
var createTopic = require('./routes/createTopic');
var getActivity = require('./routes/getActivity.js')
var searchTopic = require('./routes/searchTopic');
var getAllTopics = require('./routes/getAllTopics')
var redisTest = require('./routes/redisTest');
var upvoteAnswers= require('./routes/upvoteAnswers')
var downvoteAnswers = require('./routes/downVoteAnswer')
var users=require('./routes/users')
var userBookmarks = require('./routes/userBookmarks')
var bookmarkanswers = require('./routes/bookmarkanswers')
var addcomments=require('./routes/addcomments')

app.use('/login',login)
app.use('/signUp',signUp)
app.use('/upvoteAnswer',upvoteAnswers)
app.use('/downvoteAnswer',downvoteAnswers)
app.use('/updateProfile',profile)
//app.use(createConversation);
//app.use(getConversation);
//app.use(getMessage);
//app.use(createMessage);
app.use(followTopic);
app.use('/followUser',followUser);
app.use(getFollowers);

app.use('/getFollowing',following)
app.use('/getActivity',getActivity)
app.use('/userAnswers',userAnswers)
app.use('/userQuestions',userQuestions)
app.use('/getBookmarks',getBookmarks)
app.use('/updateAnswer',updateAnswer)
app.use('/content',content)
app.use('/searchTopicContent',searchTopicContent)
app.use('/delete',deleteUser)
app.use('/getProfile',getProfile)
app.use('/getAllQuestions',getAllQuestions)
app.use('/getTopUpvotes', topUpvotes)
app.use('/getTopDownvotes',topDownvotes)
app.use('/getTopBookmarks',topBookmarks)
app.use('/getTopViews',topViews)
app.use('/getProfileviews',getProfileviews)

app.use('/allQuestions' ,redisTest)
app.use('/notifications',notifications)
app.use('/createQuestion',createQuestion)
app.use('/getAnswers',getAnswers)
app.use('/getAllAnswers',getAnswers)
//app.use('/writeAnswer',writeAnswer)
app.use('/followQuestion',followQuestion)
app.use('/searchQuestion',searchQuestion)
app.use('/searchTopic', searchTopic)
app.use('/getAllTopics', getAllTopics)

app.use('/getUsers',users)
app.use('/getUserFollowingData',getUserFollowingData)
app.use('/createTopic', createTopic)
app.use('/userBookmarks',userBookmarks )

app.use('/bookmarkanswers',bookmarkanswers)
app.use('/addcomments',addcomments)

const fs = require('fs');
const storagepic = multer.diskStorage({
  destination: function (req, file, cb) {
      const dir = `./uploads/profile`
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
      cb(null, dir);
     
  },
 
  filename: (req, file, cb) => {

      const newFilename = `profile_${req.body.description}.jpg`;
      cb(null, newFilename);
  },
});

const uploadpic = multer({ storage : storagepic });

app.post('/addpic', uploadpic.single('selectedFile') , (req,res) => {
   
    res.send();});


app.post('/getprofilepic/:file(*)',(req, res) => {
    console.log("Inside get profile pic");
    var file = req.params.file;
    var fileLocation = path.join(__dirname + '/uploads/profile',file);
    if (fs.existsSync(fileLocation)) {
        var img = fs.readFileSync(fileLocation);
        var base64img = new Buffer(img).toString('base64');
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(base64img);
    }
    else
    {
        res.end("");
    }

});

app.get('/allQuestions', (req,res) => {
    Model.QuestionsModel.find({  },(err,question)=>{
        if(question)
        {
           res.end(JSON.stringify(question));
        }
        else
        {
           console.log("error");
        }
    
    })
});


app.get("/conversations/:id", (req, res) => {
    Model.MessageModel.find({$or: [{"id1": req.params.id}, {"id2": req.params.id}]}, (err, result) => {
        if(err){
            res.json({message: "error"})
        }
        else{
            res.json({
                message: "success",
                data: result
            })
        }
    })
})

app.post("/conversations", (req, res) => {
  
    const message = new Model.MessageModel({
        id1: req.body.from,
       
        id2: req.body.to,
      
        msg: {
            from: req.body.from,
            text: req.body.msg,
            time: req.body.time,
        }
    })

    message.save((err) => {
        if(err) { 
            res.json({ message: "error"})
        } else res.json({ message: "success"})
    })
  
})

app.get("/conversations/:id/:id1", (req, res) => {
    console.log(req.params.id)
    console.log(req.params.id1)
    Model.MessageModel.findOne({$or: [{$and:[{"id1":req.params.id1},{"id2":req.params.id}]},{$and:[{"id1":req.params.id},{"id2":req.params.id1}]}]}, (err, result) => {
        if (err) {
            res.json({ message: "error" })
        }
        else {
            res.json({
                message: "success",
                data: result.msg
            })
        }
    })
})

app.post("/conversations/:id", (req, res) => {
    const msg = req.body;
    console.log(req.body);
    Model.MessageModel.findOneAndUpdate({ $or: [{ $and: [{ "id1": req.body.from }, { "id2": req.params.id }] }, { $and: [{ "id1": req.params.id }, { "id2": req.body.from }] }] }, {$push: {msg}}, (err, result) => {
        if(err) res.json({ message: "error"})
        else{
            res.json({ message: "success"})
        }
    })
})
  

//To store images in mongodb
const storagepic2 = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = `./uploads/answers`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
       
    },
   
    filename: (req, file, cb) => {
  
        const newFilename = `Answer${req.params.id}.jpg`;
        cb(null, newFilename);
    },
  });

  arrayBufferToBase64=(buffer)=> {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
  
    return btoa(binary);
};
  const uploadpic1 = multer({ storage : storagepic2 });

  var new_img=null
  var imagepresent=0;
  app.post('/addpicforanswer/:id', uploadpic1.single('selectedFile') , (req,res) => {
    new_img = new Model.Img;
    new_img.img.data = fs.readFileSync(req.file.path)
    new_img.img.contentType = 'image/jpeg';
    new_img.save();
    imagepresent = 1;
    res.send();});

  app.post('/writeAnswer',uploadpic1.single('selectedFile'),(req,res)=>{
 
    Model.UserModel.findOne({"Email":req.body.owner},function(err,user)
    {
        if(req.body.isAnonymous==1)
                req.body.owner = 'Anonymous'
        if(imagepresent)
        {
            var base64Flag = 'data:image/jpeg;base64,';
            var url = base64Flag+ arrayBufferToBase64(new_img.img.data)
            console.log(url)
            
            var answer = Model.AnswerModel({
                answer : req.body.answer,
                owner : req.body.owner,
                isAnonymous:req.body.isAnonymous,
                date:req.body.date,
                question:req.body.question,
                imageId : req.body.imageId,
                images : new_img,
                imageURL : url
            })
        }
        else
        {
            var answer = Model.AnswerModel({
                answer : req.body.answer,
                owner : req.body.owner,
                isAnonymous:req.body.isAnonymous,
                date:req.body.date,
                question:req.body.question,
                imageId : req.body.imageId,
                images : new_img,
                imageURL : ""
            })
        }
       
        user.QuestionsAnswered =  user.QuestionsAnswered || []
        user.QuestionsAnswered.push(answer)
        console.log("Pushing"+answer)
        user.save().
        then(res=>console.log(res))
        .catch(err=>console.log("Error saving user"+err))

        answer.save()
        .then(response =>{
 
            var activity = Model.ActivityModel ({
                action : "answer",
                owner_email : req.body.owner,
                question : {
                    Question : req.body.question
                }
            });
 
            activity.save();
            Model.QuestionsModel.findOne({"Question":req.body.question},(err,question)=>{
               // console.log("I am Ques"+question)
                question.Answers.push(answer)
                question.save().
                then(response=>{
                 res.writeHead(200,{
                                 'Content-Type' : 'text/plain'
                             })
                    imagepresent = 0         
                    res.end("Created Answer Successfully")
                })
                .catch(err=>
                 {
                     res.writeHead(400,{
                     'Content-type' : 'text/plain'
                      })
                     res.end('Unable to create question'+err)
                     
                 })
 
            })
        })
    })

})

app.listen(4000,function(){console.log("Server listening on port 4000")})