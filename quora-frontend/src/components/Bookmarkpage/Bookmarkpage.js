import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from '../Header/Header'
import { ROOT_URL } from '../../config/URLsettings';

import '../news/News.css'

class Bookmarkpage extends Component {
    state = {  
       bookmarks  : [],
       comment :[],
       Email: "jessicatony@gmail.com"
    }
    componentDidMount(){
        // var url = `http://localhost:4000/viewCourses/`+localStorage.getItem('userid')
        var token = localStorage.getItem("token")
        const data = {
        Email : "deeps@gmail.com"
        }
        var url = `${ROOT_URL}/userBookmarks`
         console.log(url)  
         axios.post(url,data)
         .then(response => {
                 console.log("in then")
                 console.log(response.data)
                 this.setState({bookmarks : this.state.bookmarks.concat(response.data)})
                 console.log("After setting",this.state.bookmarks)
         })
         .catch(err =>{
            console.log("error :",err)
         })
        
 }

//  handleaddcomment= (item)=> (event) =>{
//      console.log(item)
//      console.log("buttonclicked")
//      console.log(event)
//  }

addcomment=(e)=>{
this.setState({
    comment : e.target.value

})
console.log(this.state.comment)
}
 handleaddcomment= (event) =>{
    console.log("buttonclicked")
    console.log(event)

    var token = localStorage.getItem("token")

    var url='http://localhost:4000/addcomments'
    var data = {
     "answerid" : event, 
     "email": this.state.Email,
     "comment":this.state.comment
    }
    console.log(url)
    console.log("data:",data)
     axios.post(url,data)
     .then(response => {
         console.log("got response:",response)
     })
     .catch(response => {
        // console.log(response.toString())
     })


}
    render() { 
                 
        
        let displayCards = this.state.bookmarks.map((bookmark)=>{
            if(bookmark)
            {
                return(
                    <div class="card mt-3"  style={{"width": "50rem"}}>
                    <div class="card-header">
                        Featured
                    </div>
                    <div class="card-body">
                         {/* <Link  to={{pathname : "/answers",state :{'questionid':question._id}}}  > 

                       <h5 class="card-title question">{question.Question}</h5></Link> */}
                            <div class="feed-user-pic row"> 
                                    <img class="pic ml-3" src="https://cdn2.stylecraze.com/wp-content/uploads/2013/07/10-Pictures-Of-Katy-Perry-Without-Makeup.jpg"/>
                                    <p class="ml-2">{bookmark.question}</p>
                            </div> 
                        <p class="card-text answer">{bookmark.answer}</p>
                        
                        <button style={{"font-size":"15px"}} class="transButton"><label class="QuoraLabels"><b>Upvote</b></label><i class="fa fa-arrow-circle-up ml-1"></i></button>
                        <label class="ml-1">10.4k</label>
                        <button class="ml-3 transButton" style={{"font-size":"15px"}}><label class="QuoraLabels"><b>Share</b></label><i class="fa fa-share-square ml-1"></i></button>
                        <label class="ml-1">6</label>
                        
                        <button class="ml-3 transButton" style={{"font-size":"15px","float":"right"}}><label class="QuoraLabels"><b>Downvote</b></label> <i class="fa fa-arrow-circle-down"></i></button>
                        {/* <button class="transButton" style={{"float":"right"}}><i class="fas fa-ellipsis-h ml-3" onClick={this.handleSelection(question.Answers[0]._id)}></i></button> */}
                    </div>
                    <div class='card-header'>
                        <input type="text" style={{"width":"600px"}} placeholder="Add comment"  onChange={this.addcomment} />
                        <button class="btn btn-info" value={bookmark._id} onClick={()=>this.handleaddcomment(bookmark._id)} >Add Comment</button>
                        {/* <h2>Previous Comments</h2> */}

                    </div>
                    </div>
                    
                )
            }
               
            
            
        })
        return ( 
            <div>
                 <Header/>
                <div class="row">
                    <div class="col-md-2">
                    1 of 3
                    </div>
                    <div class="col-md-7">
                {displayCards}
                </div>
                    <div class="col-md-3">
                    3 of 3
                    </div>
                </div>
            
             </div>


         );
    }
}
 
export default Bookmarkpage;