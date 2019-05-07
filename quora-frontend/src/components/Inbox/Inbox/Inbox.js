import React, { Component } from 'react';
import Scroll from 'react-scroll';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Inbox.css";

var Element = Scroll.Element;

export default class Inbox extends Component {

    constructor(props){
        super(props);
       
        this.state = {
            from : 'Shivani@gmail.com',
           // from: localStorage.getItem('email'),
            to: null,
            sub: null,
            msg: null,
            threads: null
        }
        this.toHandler = this.toHandler.bind(this)
        this.subjectHandler = this.subjectHandler.bind(this)
        this.messageHandler = this.messageHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
        this.newMessage = this.newMessage.bind(this)
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

    newMessage = (e) => {
        this.props.history.push('/newMessage')
    }

    submitHandler = (e) => {
        e.preventDefault();
        const d = new Date();
        const time = d.toDateString()+" "+d.toLocaleTimeString();
        let data = {
            from: this.state.from,
            to: this.state.to,
            sub: this.state.sub,
            msg: this.state.msg,
            time: time
        }
        axios.post("http://localhost:4000/conversations", data)
        .then((response) => {
            if(response.data.message==="error") alert("Something went wrong.")
            else if(response.data.message==="success"){
                alert("Message sent.")
                // this.props.history.push("/course");
                window.location.reload();
            }
        })
    }

    cancelAction = event => {
        this.props.history.push("/profile/answers");
      }

    componentDidMount(){
        console.log(this.state.from + "from")
        axios.get(`http://localhost:4000/conversations/${this.state.from}`)
        .then((result) => {
            console.log(result.data);
            // console.log(result.data.data)
            this.setState({ threads: result.data.data})
        })
    }

  render() {
     
      let threads =[];
      Object.assign(threads, this.state.threads);
      console.log(threads);
    return (
      <div style = {{marginTop : 0, width : 500, marginLeft : 400}}>
            <div class="modal-header">
  <h5 class="modal-title" id="exampleModalLabel"><b> Messages </b></h5>
 
  <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick = {this.cancelAction}>
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">  
            <div className="pageContent">
                <div className="row">
                    <div className="col-3 threads">
                        <Element name="test7" className="element" id="containerElement" style={{
                            position: 'relative',
                            height: '500px',
                            overflow: 'scroll',
                            width : '300px'
                        }}>
                        {(threads[0])
                            ? threads.map((t, index) => 
                                (t.id1===this.state.from)
                                ?<Link to={`/conversations/${t.id2}`} key={index} ><div className="thread"><strong></strong><br/>{t.id2}</div></Link>
                                :<Link to={`/conversations/${t.id1}`} key={index} ><div className="thread"><strong></strong><br/>{t.id1}</div></Link>
                            )
                            :"No new messages"}
                        </Element>
                    </div>
                    
                </div>
            </div>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick = {this.cancelAction}>Cancel</button>
  <button type="button" class="btn btn-primary" onClick = {this.newMessage}>New Message</button>
</div>

      </div>
    )
  }
}


