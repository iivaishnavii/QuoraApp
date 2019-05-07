import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import quora from '../../images/QuoraLogo.png';
import { Link } from 'react-router-dom';
import Notifications from '../Notifications/notification';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



import {Modal,Button} from 'react-bootstrap'
import Model from '../Modal/Model'
import axios from 'axios'
import Search from './Search.js'
import Select from 'react-select'

//import console = require('console');
const topics = [
  { label: "Life", value: 1 },
  { label: "Machine Learning", value: 2 },
  { label: "Curry", value: 3 },
  { label: "Weather", value: 4 },
  { label: "Science And Tech", value: 5 },
  { label: "San Jose", value: 6 },
]
export default class Header extends Component {

    constructor(props){
        super(props);

      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.toggle = this.toggle.bind(this);
      this.signOut = this.signOut.bind(this);
  
      this.state = {
        show: false,
        question : "",
        topics : [],
        topicSelected:"",
        dropdownOpen : false
       
      };
    }


    toggle() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    }

    handleQuestion=(e)=>{
      this.setState({question : e.target.value})
      console.log(this.state.question)
    }

    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      
      this.setState({ show: true });
    }
    
    handleTopic=(e)=>{
      this.setState({topic:e.target.value})
    }
    addQuestion=()=>
    {
      console.log("Inside add question with topics"+this.state.topics)

      var data=
        {
          "Question" : this.state.question,
          "QuestionOwner" : "asimq@gmail.com",
          "Topics" : this.state.topics,
          "PostedTime" : "23rdApril, 10:30pm",
          
        }
        console.log(data)
      
      axios.post('http://localhost:4000/createQuestion/',data)
      .then(response=>{
      this.setState({ show: false });
      window.location.reload();
      console.log("Added")
      })
      .catch(err=>{
         console.log("Failed to add question"+err)
      })
    

    }



    signOut =(e) => {
      console.log("Logging out1");
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      localStorage.removeItem('credential');

     window.location.href = "http://localhost:3000/"



  }

    addTopicToQuestion=(e)=>{
      console.log("Inside add topic to question")
      
      // if(this.state.topics.length===0)
      // {
      //   console.log("Adding"+this.state.topicSelected)
      //   this.setState({topics:this.state.topicSelected})
      // }
       
      // else
      // {
        this.setState({
          topics: [
              ...this.state.topics,
              this.state.topicSelected
          ]
        })
     // }

    }
  
    render() {

      let lt = null
      if(this.state.topics.length>0)
      {
        console.log("Printing list"+this.state.topics)
        //console.log("TYPE"+typeof(this.state.topics))
        // var t = Array.from(this.state.topics)
        lt = this.state.topics.map(l=>{
          return(
            <div>
              {l}
            </div>
          )

        })
        
      }
        return (
<div>
          
<nav class="navbar navbar-expand-lg navbar-light bg-light">

            <img className = "QuoraLogo" style = {{ width : 120, height: 50, marginTop: "-3%" }}src = {quora}/>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" style={{"fontSize":"small"}} href="http://localhost:3000/newsfeed">  <i class="fas fa-home fa-2x"></i> Home <span class="sr-only">(current)</span></a>
               </li>
                <li class="nav-item">
                 <a class="nav-link" style={{"fontSize":"small"}} href="#">  <i class="fas fa-edit fa-2x"></i> Answer</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" style={{"fontSize":"small"}} href= {`/dashboard`}>  <i class="fa fa-chart-line fa-2x"></i> Dashboard</a>
                </li>
               <Notifications/>    
                
               
                {/* <form class="form-inline"> */}
                 <Search></Search>
                {/* </form> */}
                <div >
                <Dropdown   style = {{width : 100, marginTop :10}} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Profile
        </DropdownToggle>
        <DropdownMenu>
          {/*<DropdownItem header>Header</DropdownItem> */}
          <DropdownItem> <Link to={`/profile/answers/${localStorage.getItem('email')}`}>  Profile</Link></DropdownItem>
          <DropdownItem > <Link to={`/home}`}>  Blogs </Link> </DropdownItem>
          <DropdownItem > <Link to={`/conversations`}>  Messages </Link></DropdownItem>
          <DropdownItem><Link to={`/Blogs}`}>  Your Content </Link></DropdownItem>
          <DropdownItem><Link to={`/Blogs}`}> Stats </Link></DropdownItem>
          <DropdownItem><Link to={`/Blogs}`}> Create Ad </Link> </DropdownItem>
          <DropdownItem> <Link to={`/Blogs}`}> Settings </Link> </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Help ·
About · 
Logout</DropdownItem>
          
        </DropdownMenu>
      </Dropdown>

      
      </div>

              





               
                <li class="nav-item">
                  <div className = "col-sm-1" align ="center">   
                    <button type="button" class="btn btn-danger" align = "right" style={{"fontSize":"small", marginTop: 5.5}} onClick={this.handleShow}> Add Question or Link</button>            
                  </div> 
                </li>  
    
                <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{"color":"#b92b27","font-weight":500,"font-family":"Helvetica Neue,Helvetica,Arial,sans-serif","font-size": "15px"}}>Add Question</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input type="text" placeholder="Start your question with What , How , Why" onChange={this.handleQuestion}></input>
                    
                  </Modal.Body>
                  <Modal.Body>
                      <div class="row">
                        <div class="col-sm-11"> <Select options={topics} 
                        onChange={opt=>this.setState({topicSelected:opt.label})}
                        /></div>
                        <div classs="col-sm-1 "><button><i class="fa fa-plus" onClick={this.addTopicToQuestion}></i></button></div>
                      </div>
                     

                      {lt}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={this.addQuestion}>
                        Add Question
                    </Button>
                  </Modal.Footer>
                </Modal>
                <div>
                <Button onClick= {this.signOut}> Logout</Button>
              </div>
              </ul>
              </div>
              </nav>
              </div>
 
  
          


            
        );
    }
}



