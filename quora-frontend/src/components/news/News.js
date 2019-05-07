import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import '../news/News.css'
class News extends Component {
    state = {  
        news : [],
        showAnswerDialog : false,
        refreshcomponent : true,
        upvotedItem: 0
    }
    componentDidMount(){
       // var token = localStorage.getItem("token")
        var url = `http://localhost:4000/getAllQuestions`
         console.log(url)  
        // axios.get(url,{headers : {"Authorization": `Bearer ${token}`}}).
        axios.get(url).
         then(response => {
                 console.log("in then get all questions")
                 console.log(response.data)
                 this.setState({news : this.state.news.concat(response.data)})
                 console.log("After setting",this.state.news[1])
         })
        
    }

    
    handleUpvote=(event,questionid,answerid)=>{
        if(event.currentTarget.dataset.id==answerid)
        {
            console.log("clicked"+questionid)
             var data = {
            "answerid":answerid,
            "questionid":questionid
            }
        axios.post('http://localhost:4000/upvoteAnswer',data)
        .then(res=>
            {
                console.log("Success"+res)
                //this.setState({upvotedItem:res})
                window.location.reload();

            }
            
          )
          .catch(res=>console.log("Fail"))
        }
       // console.log("Answer id"+val)
       
    }


    handledownVote=(event,questionid,answerid)=>{
        if(event.currentTarget.dataset.id==answerid)
        {
            console.log("clicked"+questionid)
             var data = {
            "answerid":answerid,
            "questionid":questionid
            }
        axios.post('http://localhost:4000/downvoteAnswer',data)
        .then(res=>
            {
                console.log("Success"+res)
                //this.setState({upvotedItem:res})
                window.location.reload();

            }
            
          )
          .catch(res=>console.log("Fail"))
        }
       
       
    }


    render() { 
 
        
        /*Display Answers dynamically*/
        let displayCards = this.state.news.map((question,i)=>{
            if(question.Answers.length>0)
           {
               //console.log("Question"+JSON.stringify(question))
                return(
                    <div class="card mt-3"  style={{"width": "50rem"}}>
                    <div class="card-header">
                        Featured
                    </div>
                    <div class="card-body">
                        <Link  to={{pathname : "/answers",state :{'questionid':question._id}}}  > 

                       <h5 class="card-title question">{question.Question}</h5></Link>
                        <div class="feed-user-pic row">
                            <img class="pic ml-3" src="https://cdn2.stylecraze.com/wp-content/uploads/2013/07/10-Pictures-Of-Katy-Perry-Without-Makeup.jpg"/>
                            <p class="ml-2">{question.Answers[0].owner}</p>
                        </div>
                        <p class="card-text answer">{question.Answers[0].answer}</p>
                        
                        <button style={{"font-size":"15px"}} class="transButton" onClick={e=>{this.handleUpvote(e,question._id,question.Answers[0]._id)}} data-id={question.Answers[0]._id}><label class="QuoraLabels"><b>Upvote</b></label><i class="fa fa-arrow-circle-up ml-1"></i></button>
                        <label class="ml-1">{question.Answers[0].upVotes}</label>
                      
                        <button class="ml-3 transButton" style={{"font-size":"15px"}}><label class="QuoraLabels"><b>Share</b></label><i class="fa fa-share-square ml-1"></i></button>
                        <label class="ml-1">6</label>
                        
                        <button class="ml-3 transButton" style={{"font-size":"15px","float":"right"}} onClick={e=>{this.handledownVote(e,question._id,question.Answers[0]._id)}} data-id={question.Answers[0]._id} ><label class="QuoraLabels"><b>Downvote</b></label> <i class="fa fa-arrow-circle-down"></i> <label class="ml-1"> {question.Answers[0].downVotes}</label></button>
                        
                    </div>
                    <div class='card-header'>
                        <input type="text" style={{"width":"750px"}} placeholder="Add comment"/>
 
                    </div>
                    </div>
                    
                )
           }
           else
           {
               return(
                <div class="card mt-3"  style={{"width": "50rem"}}>
                    <div class="card-header">
                            Questions for you
                    </div>
                    <div class="card-body">
                        <Link  to={{pathname : "/answers",state :{'questionid':question._id}}}> 
                        <h5 class="card-title question">{question.Question}</h5></Link>
                    </div>
                   
                </div>

               )
           }
               
            
            
        })
        
        return ( 
            <div>
                {displayCards}
               

            </div>


         );
    }
}
 
export default News;