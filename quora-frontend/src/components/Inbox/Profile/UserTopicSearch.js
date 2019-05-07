import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ROOT_URL } from '../../config/URLsettings';
import {Redirect} from 'react-router-dom';



import axios from 'axios';

 export default class UserTopicSearch extends Component {
  
  
  constructor(props) {
    super(props);
    
    this.state = {
        Email: 'Shivani@gmail.com',
        //Email : localStorage.getItem('email');
        token : localStorage.getItem('token'),
        Name: '',
        City: '',
        State: '',
        ZipCode: '',
        Profile: '',
        Education: '',
        CareerInformation: '',
        Description: '',
        ProfileCredential: '',
        Questions: [],
        QuestionsFollowed: [],
        AnswersBookmarked : [],
        Topics : [],
        Followers : [],
        Following : [],
        ProfileViews : '',
        QuestionsAnswered: [],
        profilepic: '',
        TopicSearchResults : []
    };

    this.handleSearchTerm = this.handleSearchTerm.bind(this);

  }

  

  componentDidMount(){
   
    axios.get(ROOT_URL +`/getProfile/${this.state.Email}`, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
    }).then((response) => {
     var  data = response.data;
     console.log(response);
     console.log(response.data);
      //update the state with the response data
     
      this.setState({
        Name : data.Name,
        City: data.City,
        State: data.State,
        ZipCode: data.ZipCode,
        Profile: data.Profile,
        Education: data.Education,
        CareerInformation: data.CareerInformation,
        Description: data.Description,
        ProfileCredential: data.ProfileCredential,
        Questions: data.Questions,
        QuestionsFollowed: data.QuestionsFollowed,
        AnswersBookmarked : data.QuestionsAnswered,
        Topics : data.Topics,
        Followers : data.Followers,
        Following : data.Following,
        //ProfileViews : '',
        QuestionsAnswered: data.QuestionsAnswered,
        searchterm : '',
        
      });
    });

   
 }



  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }



  handleSearchTerm = event => {
    this.setState({searchterm: event.target.value});
  }
  serachtermHandler = (e) => {
   
   
    var data = {
      topicName : this.state.searchterm,
      }
    if(this.state.searchterm !== ''){
     console.log(data)
      axios.get(`${ROOT_URL}/searchTopic/${this.state.searchterm}`)
      .then(response => {
      

        if(response && !(response == null)) {
          
         
         
          this.setState({
            TopicSearchResults : response.data
          })
        }
        
    }); 

    console.log(this.state.TopicSearchResults);
  }
}


followTopic = (e) => {
  console.log("Topic name" +  e.target.value); 

  

var data = {
  topicName : e.target.value,
  Email : this.state.Email
  }

  axios.post(`${ROOT_URL}/followTopic`, data)
  .then(response => {
  
    if(response && !(response == null)) {
      
    }
    
}); 


}



componentWillMount()
    {
    
        axios.post(`${ROOT_URL}/getprofilepic/profile_${localStorage.getItem('name')}.jpg`)
                .then(response => {
                    console.log("Imgae Res : ",response);
                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                    this.setState({
                        profilepic: imagePreview
                    })
                }); 

    }

    cancelAction = event => {
      this.props.history.push("/profile/answers");
    }
    
  


  render(){
    var redirectVar = null;
    if(!localStorage.getItem('token')){
      redirectVar = <Redirect to="/" />
      return redirectVar;        
    }  

    let topics = [];
    Object.assign(topics, this.state.Topics);
    let topicDetails = topics.map((topic,index)=>{
      return <div className="quiztab"  style  = {{width: 180}} key={index}>{topic.topicName}</div>
    })

   
    let topicSearcDetails = this.state.TopicSearchResults.map((topic,index)=>{
      return <div className="quiztab"  style  = {{width: 180}} key={index}>{topic.topicName} <button  value = {topic.topicName}  onClick = {this.followTopic} ><i   class="fas fa-plus-square"></i> </button> </div>
    })
    

    return (
<div className = "row">

<div className="Profile" style = {{marginTop : 0, width : 500, marginLeft : 400}}>
<div class="modal-header">
  <h5 class="modal-title" id="exampleModalLabel"><b> Edit the topics you know about </b></h5>
 
  <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick = {this.cancelAction}>
    <span aria-hidden="true">&times;</span>
  </button>
</div>




<div class="modal-body">
<div className="row coursesearch">
            <input type="text" style = {{width : 500, marginBottom : 30}}name="searchterm" className="searchinput" placeholder= "Search for a topic" value = {this.state.searchterm} onChange={this.handleSearchTerm}/>
           
            <br></br>
            <button onClick = {this.serachtermHandler}> Search </button>
          <div>{ topicDetails} </div> 
   <div>{topicSearcDetails} </div>
          </div>
  
       
  
 
 
</div>
 
    

    <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick = {this.cancelAction}>Done</button>
  <button type="button" class="btn btn-primary" onClick = {this.updateProfile}>Save Changes</button>
</div>
    
</div>

</div>
      
    );
  }
}

