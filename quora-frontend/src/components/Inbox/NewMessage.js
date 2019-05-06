import React, { Component } from 'react';

import Scroll from 'react-scroll';
import { Link } from 'react-router-dom';

import axios from 'axios';
import "./Inbox.css";
import Header from '../Header/Header'

var Element = Scroll.Element;

export default class NewMessage extends Component {

    constructor(props){
        super(props);
       
        this.state = {
           // from: '',
           from : localStorage.getItem('email'),
            to: null,
            sub: null,
            msg: null,
            threads: null
        }
        this.toHandler = this.toHandler.bind(this)
        this.subjectHandler = this.subjectHandler.bind(this)
        this.messageHandler = this.messageHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    toHandler = (e) => {
        this.setState({ to: e.target.value})
    }
    
    subjectHandler = (e) => {
        this.setState({ sub: e.target.value})
    }
    
    messageHandler = (e) => {
        this.setState({ msg: e.target.value})
    }

    cancelAction = event => {
        this.props.history.push("/profile/answers");
      }

    submitHandler = (e) => {
        e.preventDefault();
        const d = new Date();
        const time = d.toDateString()+" "+d.toLocaleTimeString();
        let data = {
            from: localStorage.getItem('email'),
           //from : localStorage.getItem('email'),
            to: this.state.to,
          
            msg: this.state.msg,
            time: time
        }
        axios.post("http://localhost:4000/conversations", data)
        .then((response) => {
            if(response.data.message==="error") alert("Something went wrong.")
            else if(response.data.message==="success"){
                alert("Message sent.")
                
                window.location.reload();
            }
        })
    }

    componentDidMount(){
        axios.get("http://localhost:4000/conversations")
        .then((result) => {
           
            this.setState({ threads: result.data.data})
        })
    }

  render() {
      let threads =[];
      Object.assign(threads, this.state.threads);
    return (
        <div> <Header/> 
   <div  style = {{marginTop : 0, width : 500, marginLeft : 400}} >
     
        <div class="modal-header"  >
<h5 class="modal-title" id="exampleModalLabel"><b> New Message </b></h5>

<button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick = {this.cancelAction}>
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">  
<div className="pageContent">
                <div className="row">
                    
                    <div className="col-9">
                      
                        <form className="compose" onSubmit={this.submitHandler}>
                            <input type="text" style = {{width :500}} placeholder="To: " onChange={this.toHandler} required /><br/>
                            
                            <textarea rows="5" cols="100"  style = {{width :500}}  placeholder="Message" onChange={this.messageHandler} required /><br/>
                            <Link to="/conversations"><button className="btn btn-primary">Back</button></Link>&nbsp;
<input type="submit" className="btn btn-primary" value="Send"></input>
                        </form>
                    </div>
                </div>
            </div>

</div>
<div class="modal-footer">

</div>
</div>
  </div>

     
    )
  }
}


