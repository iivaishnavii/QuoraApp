import React from 'react';
import './Modal.css'
import axios from 'axios'
//import console = require('console');
class Model extends React.Component {

  state={
    question : ""
  }

  handleQuestion=(e)=>{
   this.setState({question : e.target.value})
  }
   
    render() {
      return (
        <div>
      
        </div>
      );
    }
  }
  
export default Model;