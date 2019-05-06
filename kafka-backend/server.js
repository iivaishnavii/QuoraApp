var connection =  new require('./kafka/Connection');
//topics files

var login = require('./services/login.js');

var profile = require('./services/profile')

var signup = require('./services/signup');

var CreateConversation = require('./services/createConversation');
var FollowTopic = require('./services/followTopic');
var FollowUser = require('./services/followUser');
var SendMessage = require('./services/sendMessage');
var GetFollowers = require('./services/getFollowers');
var GetMessage = require('./services/getMessage');
var GetConversation = require('./services/getConversation');
var following = require('./services/following.js');
var userAnswers = require('./services/userAnswers.js')
var userQuestions = require('./services/userQuestions.js')
var userBookmarks = require('./services/userBookmarks.js')
var updateAnswer = require('./services/updateAnswer.js')
var notifications = require('./services/notifications')

var content = require('./services/content.js')
var getActivity = require('./services/getActivity')


var deleteUser = require('./services/deleteUser.js')
var getProfile = require('./services/getProfile.js')
var createQuestion =  require('./services/createQuestion.js')
var getAnswers = require('./services/getAnswers')
var getAllQuestions = require('./services/getAllQuestions')
var writeAnswer = require('./services/writeAnswer')
var followQuestion = require('./services/followQuestion')
var searchQuestion = require('./services/searchQuestion')
var searchTopic = require('./services/searchTopic')
var createTopic = require('./services/createTopic');
var upvoteAnswer = require('./services/upvoteAnswers')


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic namex
//second argument is a function that will handle this topic request

 handleTopicRequest("login",login)
handleTopicRequest("upvoteAnswer",upvoteAnswer)
handleTopicRequest("update-profile",profile)
handleTopicRequest("delete-user",deleteUser)
handleTopicRequest("createConversation",CreateConversation)
handleTopicRequest("get-profile",getProfile)
handleTopicRequest("get-answers",getAnswers) 
handleTopicRequest("create-question",createQuestion) 
  handleTopicRequest("signup",signup)
  handleTopicRequest("get-profile",getProfile)
 
 handleTopicRequest("get-questions",getAllQuestions)
handleTopicRequest("create-topic", createTopic);
handleTopicRequest("get-questions",getAllQuestions)
 handleTopicRequest("write-answer",writeAnswer)
 handleTopicRequest("notifications",notifications)
 handleTopicRequest("follow-question",followQuestion)
 handleTopicRequest("content",content);
handleTopicRequest('get_activity',getActivity)
handleTopicRequest("search-question",searchQuestion)
handleTopicRequest("search-topic",searchTopic) 




handleTopicRequest("get_following",following)
handleTopicRequest("user_answers",userAnswers);
handleTopicRequest("user_questions",userQuestions)
handleTopicRequest("user_bookmarks",userBookmarks)
handleTopicRequest("update_answer",updateAnswer)




 handleTopicRequest("followTopic",FollowTopic)
handleTopicRequest("followUser",FollowUser)
handleTopicRequest("sendMessage",SendMessage)
handleTopicRequest("getFollowers",GetFollowers)
handleTopicRequest("getMessage",GetMessage)
handleTopicRequest("getConversation",GetConversation)   





