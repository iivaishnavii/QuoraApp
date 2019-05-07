import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import login from '../Login/login';
import profile from '../Header/Header';
import newsfeed from '../NewsFeed/newsfeed'
import News from '../news/News'
import answer from '../Answers/answers'
import contentHome from '../Content/contentHome'

import Model from '../Modal/Model'
//import profile from '../Header/Header';

import frame from '../Frame/frame';
import signUp from '../SignUp/signUp';


//import profileFollowers from '../Profile/UserFollowers';
import profileFollowers from '../Profile/ProfileFollowers';
import profileFollowing from '../Profile/ProfileFollowing';

import profileQuestions from '../Profile/ProfileQuestions';
import profileAnswers from '../Profile/ProfileAnswers';
import editProfile from '../Profile/editProfile';
import editCredentials from '../Profile/editCredentials';
import Inbox from '../Inbox/Inbox';
import NewMessage from '../Inbox/NewMessage';
import Thread from '../Inbox/Thread';
import topic from '../Topics/topic'
import Dashboard from '../Dashboard/Dashboard'

import searchTopic from '../Profile/UserTopicSearch';
import notification from '../Notifications/notification';



//Create a Main Component
class Main extends Component {
    render(){
        return(
            <BrowserRouter>
            <div>
                {/*Render Different Component based on Route*/}
                
                <Route path='/signUp' exact component={signUp}/> 
                <Route path="/profile" exact component={profile}/>
                <Route path="/newsfeed" exact component={newsfeed}/>
                <Route path="/newscards" exact component={News}/>
                <Route path="/answers" exact component={answer}/>
                <Route path="/modal" exact component={Model}/>

                <Route path='/' exact component={frame}/>
            
                
                
                <Route path='/content'  component={contentHome}/> 
                <Route path='/dashboard'  component={Dashboard}/> 
           
           
                
              
                <Route path="/profile/answers/:id" exact component={profileAnswers}/>
                <Route path="/profile/questions/:id" exact component={profileQuestions}/>
                <Route path="/profile/Followers/:id" exact component={profileFollowers}/>
                <Route path="/profile/Following/:id" exact component={profileFollowing}/>
                <Route path="/editCredentials" exact component={editCredentials}/>
                <Route path="/editProfile" exact component={editProfile}/>
                <Route path="/searchTopicByUser" exact component={searchTopic}/>
               
                <Route exact path="/conversations" component={Inbox} />
                <Route path="/conversations/:id" component={Thread} />
                <Route exact path="/newMessage" component={NewMessage} />
                <Route path="/newsfeed/topic" component={topic} />

                 
            </div>
            </BrowserRouter>
        )
    }
}
//Export The Main Component
export default Main;