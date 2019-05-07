import React, { Component } from 'react';
import Scroll from 'react-scroll';

import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Inbox.css";

var Element = Scroll.Element;

export default class Thread extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
            id1: '',
            id2: this.props.match.params.id,
            texts: null
        }
        this.messageHandler = this.messageHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }

    messageHandler = (e) => {
        this.setState({ message: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault();
        const d = new Date();
        const time = d.toDateString() + " " + d.toLocaleTimeString();
        const data = {
            from: 'Shivani@gmail.com',
            //from: localStorage.getItem('email'),
            text: this.state.message,
            time: time
        }
        axios.post(`http://localhost:4000/conversations/${this.state.id2}`, data)
        .then((response)=>{
            if(response.data.message==="error") alert("Something went wrong.")
            else if(response.data.message==="success"){
                alert("Message sent.")
                // this.props.history.push("/conversations");
                window.location.reload();
            }
        })
    }

    cancelAction = event => {
        this.props.history.push("/profile/answers");
      }

    componentDidMount(){
        //axios.get(`http://localhost:4000/conversations/${this.state.id2}/${localStorage.getItem('email')}`)
        axios.get(`http://localhost:4000/conversations/${this.state.id2}/Shivani@gmail.com`)
        .then((response) => {
            console.log(response.data.data);
            this.setState({ texts: response.data.data})
        })
    }

  render() {
      let texts = [];
      Object.assign(texts, this.state.texts);
    return (
      <div  style = {{ marginLeft : 400, width : 500}} >
          <div class="modal-header">
<h5 class="modal-title" id="exampleModalLabel"><b> Conversation with {this.state.id2} </b></h5>

<button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick = {this.cancelAction}>
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body"> 
            <div className="pageContent">
                <div className="row">
                    <div className="col-12">
                        <Element name="test7" className="element" id="containerElement" style={{
                            position: 'relative',
                            height: '300px',
                            overflow: 'scroll',
                            width: "100%"
                        }}>
                        {texts.map((t, index) => {
                            return <div key={index} className="text">
                            <span className="textname">{t.from}</span><span className="texttime">{t.time}</span><br/>
                            {t.text}</div>
                        })}
                        </Element>
                        <form onSubmit={this.submitHandler} style={{padding: "10px 0"}}>
                            <textarea rows="5" placeholder="message" onChange={this.messageHandler} style={{width: "100%"}} />
                        
                        </form>
                    </div>
                </div>
            </div>

</div>
<div class="modal-footer">
<form onSubmit={this.submitHandler} style={{padding: "10px 0"}}>
<Link to="/conversations"><button className="btn btn-primary">Back</button></Link>&nbsp;
<input type="submit" value="Reply" className="btn btn-primary" required />
</form>
</div>

      </div>
    )
  }
}


