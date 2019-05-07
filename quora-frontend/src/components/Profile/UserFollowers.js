import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import quora from '../../images/QuoraLogo.png';
import style from '../Profile/profile.css';
import { ROOT_URL } from '../../config/URLsettings';
import axios from 'axios';
import Header from '../Header/Header';
import Modal from '../Modal/Model';
import UserQuestions  from './UserQuestions';

export default class ProfileNav extends Component {
    constructor(props){
        super(props);
        this.state = {
            Email: 'akhil.kiran@gmail.com',
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
            profilepic: ''
        };
        this.addpicture = this.addpicture.bind(this);
    this.savepicture = this.savepicture.bind(this);
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
             show : false
           });
         });
         
         
     }

     addpicture = (e) => {
      if (e.target.name === 'selectedFile') {
          this.setState({
              selectedFile: e.target.files[0]
          })
      }
  }

  showModal = () => {

    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  componentWillMount()
    {
    
        axios.post(`${ROOT_URL}/getprofilepic/profile_${this.state.Email}.jpg`)
                .then(response => {
                    console.log("Imgae Res : ",response);
                    let imagePreview = 'data:image/jpg;base64, ' + response.data;
                    this.setState({
                        profilepic: imagePreview
                    })
                }); 

                console.log(this.state.profilepic);

    }

  savepicture = (e) =>
{
  
    const desc = this.state.Email;

    const  data  = Object.assign({},this.state);

    //const { files } = this.state;
    let formData = new FormData();
    console.log(desc);
    console.log(data.selectedFile);

    formData.append('description', desc);
    formData.append('selectedFile', data.selectedFile);
 

    axios.post(`${ROOT_URL}/addpic`, formData)
    .then((result) => {
      this.setState({selectedFile : ''});
      this.componentDidMount();
  });
   

}

     openQuestions =(e) => {
        this.props.history.push('/profile/questions')
      }

      openAnswers =(e) => {
        this.props.history.push('/profile/answers')
      }
      openEmpty =(e) => {
        this.props.history.push('/profile')
      }
      openFollowers =(e) => {
        this.props.history.push('/profile/Followers')
      }
      openFollowing =(e) => {
        this.props.history.push('/profile/Following')
      }
      editCrentials =(e) => {
        console.log("editing");
        this.props.history.push('/editCredentials')
      }

      editCrentials =(e) => {
        console.log("editing");
        this.props.history.push('/editCredentials')
      }

      searchTopics =(e) => {
        console.log("editing");
        this.props.history.push('/searchTopicByUser')
      }

      editProfile =(e) => {
        console.log("editing");
        this.props.history.push('/editProfile')
      }


    

    render() {


        return(
            <div>
              <Header/>
                <div className = 'row'>
                <div className = 'col-sm-9' >
                <div class ="sidebar-profile1">
                <div className = 'row'>
               {/* <div className = 'col-sm-8' >  */}
                <div class = "header" style = {{marginleft : 100,
    width : 744,
    height : 164}} >
            <div className = 'row' style = {{height : 180}}>
            <div className = 'col-sm-4' style = {{height : 180}} >
            <div style = {{ width : 200, marginleft : 50}}>
       <img  style = {{ width : 142, height : 142, marginleft : 100}}src={this.state.profilepic}
                     className="image--cover" />
                <form >
                    <div className="form-group" style = {{width : 300}}>
                        <input type="file" className="profile" name="selectedFile" onChange={this.addpicture} style = {{width : 100}}/> &nbsp;
                        <button style = {{width : 50}}
           
            onClick = {this.savepicture} >
            <div class = "edit_icon"></div>
          save
          </button>     
                        
                       
          
          
                    </div>
                </form>
                </div>
                
                 </div> 
                 <div className = 'col-sm-8' >
                  <h3 style = {{marginTop : 30}}> <b>{this.state.Name}  </b>  <button onClick = {this.editProfile}> <i class="fas fa-pen"></i>  </button>    </h3> 
                  
                   <h4 > {this.state.ProfileCredential}   </h4> 
                   <h5 > <b> <i> {this.state.Description} </i> </b>  </h5> 
                   <button id='all' class="button-content " ><span class ="size-sm" > {this.state.Followers.length} Followers </span></button>
                 </div> 
                 </div>
             <div>
              
             </div>
    </div>
            
            <hr class ="hr" style = {{width : 744, marginLeft : 120}}></hr>    
         </div>
         <div className = "row" style = {{width : 1000}}>
            <div class="col-md-3 width11" >
            <p class="heading"> Feeds </p>
                        <hr class ="hr"></hr>
                        <div class="btn-group-vertical">
                        <button id='all' class="button-content " default = "active" onClick ={this.openEmpty}><span class ="size-sm1" >Profile </span></button>
                        <button id='questions' class="button-content" onClick ={this.openAnswers}  > <span class ="size-sm1" >Answers  {this.state.QuestionsAnswered.length}</span></button>
                        <button id='followed' class="button-content" onClick ={this.openQuestions}  > <span class ="size-sm1" >Questions {this.state.Questions.length} </span></button>
                        <button  id='posts' class="button-content"  onClick ={this.openPosts} > <span class ="size-sm1" >Shares 0</span></button>
                        <button id='all' class="button-content "  onClick ={this.openEmpty} ><span class ="size-sm1" >Spaces 0 </span></button>
                        <button id='all' class="button-content "  onClick ={this.openEmpty} ><span class ="size-sm1" >Posts 0</span></button>
                        <button id='all' class="button-content "  onClick ={this.openEmpty} ><span class ="size-sm1" >Blogs 0 </span></button>
                        <button id='all' class="button-content "  onClick ={this.openFollowers} ><span class ="size-sm1" >Followers {this.state.Followers.length}</span></button>
                        <button id='all' class="button-content "  onClick ={this.openFollowing} ><span class ="size-sm1" >Following {this.state.Following.length}</span></button>
                        <button id='all' class="button-content "  onClick ={this.openEmpty} ><span class ="size-sm1" >Edits </span></button>
                        <button id='all' class="button-content "  onClick ={this.openEmpty} ><span class ="size-sm1" >Activity </span></button>
                        </div>
                        <br>
                        </br>
                        <br>
                        </br>
                        </div>
                     <div >
                    
                     </div>

                   
                 
                   
    
                      </div>
                      </div>
                      </div>
                      <div className = 'col-sm-3' >
            <div class="col-md-3 width12" >
            <p class="heading" style = {{width : 250}}> Credentials & Highlights  &nbsp; <button onClick = {this.editCrentials}> <i class="fas fa-pen"></i>  </button> </p>
                        <hr class ="hr" style = {{width:215}} ></hr>
                      
            <div class="btn-group-vertical1" style = {{height : 200, width : 200}}>

            <p> <i class="fas fa-briefcase"></i> &nbsp;


            <span class ="size-sm"> <b> {this.state.Profile} </b> </span>  </p>
      <p> <i class="fas fa-graduation-cap"></i> &nbsp;


      <span class ="size-sm"> <b>{this.state.CareerInformation} </b> </span> </p>
      <p> <i class="fas fa-university"></i> &nbsp;


      <span class ="size-sm"> <b>{this.state.Education}  </b></span> </p>
      <p style = {{width : 210}}> <i class="fas fa-map-marker-alt"></i> &nbsp;
      <span class ="size-sm">  Add a Location Credential </span>  </p>
      <p> <i class="fas fa-eye"></i>


      <span  class ="size-sm" >{this.state.ProfileViews} Profile views </span> </p>
            
            </div>
                        <br>
                        </br>
                        <br>
                        </br>
                        </div>

                        <div class="col-md-3 width12" >
            <p class="heading" style = {{width : 250}} > Knows About &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;<button onClick = {this.searchTopics}> <i class="fas fa-pen"></i>  </button>  </p>
                        <hr class ="hr" style = {{width:215}}></hr>
                      
                     
                     
                        </div>
                     
                      </div>
                      </div>
                      </div>
         
                 )
       
    }


}



