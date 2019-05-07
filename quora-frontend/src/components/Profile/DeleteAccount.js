import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {rooturl} from '../../config/settings';
import SideQuoraPic from '../../images/SideQuoraPic.png';
import RightQuoraPic from '../../images/RightQuoraPic.png'
import { Redirect } from 'react-router';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';

class DeleteAccount extends Component{
 
    deleteUser = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:4000/delete/${localStorage.getItem('email')}`)
        .then((response)=>{
            this.props.history.push("/");
        })
    }

    cancelAction = event => {
        this.props.history.push("/newsfeed");
      }


  
  render(){

    
    return(
      
      <div >
 <div> <Header/> 
   <div  style = {{marginTop : 0, width : 500, marginLeft : 400}} >
     
        <div class="modal-header"  >
<h5 class="modal-title" id="exampleModalLabel"><b> Are you sure you want to delete the account? </b></h5>

<button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick = {this.cancelAction}>
<span aria-hidden="true">&times;</span>
</button>
</div>
<div class="modal-body">  
<div className="pageContent">
                <div className="row">
                    
                    <div className="col-9">
                     
                    </div>
                </div>
            </div>

</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-dismiss="modal" onClick = {this.cancelAction}>Cancel</button>
  <button type="button" class="btn btn-primary" onClick = {this.deleteUser}>Yes, I confirm</button>
</div>
</div>
  </div>

       
      </div>
      
  


  );
  }
  


}
export default DeleteAccount;