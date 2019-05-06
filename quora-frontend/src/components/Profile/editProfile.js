import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ROOT_URL } from '../../config/URLsettings';
import {Redirect} from 'react-router-dom';


import axios from 'axios';

 export default class editProfile extends Component {
  
  
  constructor(props) {
    super(props);
    
    this.state = {
        //Email: 'Shivani@gmail.com',
        Email : localStorage.getItem('email'),
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
        profilepic: ''
    };

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
      });
    });
   
 }



  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  cancelAction = event => {
    this.props.history.push("/profile/answers");
  }



  updateProfile = event => {
    console.log("Button");
    event.preventDefault();
    var data = {
        Name : this.state.Name,
        City: this.state.City,
        State: this.state.State,
        ZipCode: this.state.ZipCode,
        Profile: this.state.Profile,
        Education: this.state.Education,
        CareerInformation: this.state.CareerInformation,
        Description: this.state.Description,
        ProfileCredential: this.state.ProfileCredential,
        Questions: this.state.Questions,
        QuestionsFollowed: this.state.QuestionsFollowed,
        AnswersBookmarked : this.state.QuestionsAnswered,
        Topics : this.state.Topics,
        Followers : this.state.Followers,
        Following : this.state.Following,
        ProfileViews : this.state.ProfileViews,
        QuestionsAnswered: this.state.QuestionsAnswered,
    }
    console.log(data);


axios.post(ROOT_URL +`/updateProfile/${this.state.Email}`,  data, {
    headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}
}).then((response) => {
 var  data = response.data;
 console.log(response.data);
  //update the state with the response data
  this.props.history.push('/profile/answers');
  
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


    
  


  render(){
    var redirectVar = null;
    if(!localStorage.getItem('token')){
      redirectVar = <Redirect to="/" />
      return redirectVar;        
    }  
    return (
      <div className = "row">

      <div className="Profile" style = {{marginTop : 0, width : 500, marginLeft : 400}}>
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><b> Edit Credentials </b></h5>
       
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick = {this.cancelAction}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
     
     
      
  
      <div class="modal-body">
       
        <form  align= "center">
          
          <Form.Group controlId="Name" >
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={this.state.Name}
              onChange={this.handleChange}
              type="text"
            />
         </Form.Group>
         
          <Form.Group controlId="Description" >
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={this.state.Description}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group> 
          <Form.Group controlId="ProfileCredential" >
            <Form.Label>ProfileCredential</Form.Label>
            <Form.Control
              value={this.state.ProfileCredential}
              onChange={this.handleChange}
              type="text"
            />
          </Form.Group> 
        
        </form>
       
      </div>
       
          

          <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick = {this.cancelAction}>Cancel</button>
        <button type="button" class="btn btn-primary" onClick = {this.updateProfile}>Save Changes</button>
      </div>
          
      </div>
    
      </div>
    );
  }
}



