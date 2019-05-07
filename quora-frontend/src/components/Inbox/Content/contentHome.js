

import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {rooturl} from '../../config/settings';
import axios from 'axios';

import './content.css';
import Topic from '../Content/topic.js'



//create the Navbar Component
class ContentHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            contents : [],
            activity : [],
            filteredContent : [],
          //  Questions : [],
            Answers :[],
            Followed : [],
            type : 'al',
            search : ''
            } 
    }

    componentDidMount () {
        const data = {
            email : "deeps@gmail.com"
           }
  
        //   axios.post('http://'+rooturl+':4000/content',data)
        //    .then(response => {

        //             this.setState({
        //                 contents : this.state.contents.concat(response.data)
                    
        //                });
        //      });

             axios.post('http://'+rooturl+':4000/getActivity',data)
                .then(response => {
                    this.setState({
                        activity : this.state.activity.concat(response.data)
                    
                       });
                       this.setState({
                        filteredContent : this.state.filteredContent.concat(response.data)
                    
                       });
                    
                });
             
             
    }

  

content() {
//     console.log('in content');
//     console.log(this.state.type);
//     console.log( this.state.contents);
   
//       if(this.state.contents.length > 0) {
//         console.log('inside cintnetns'); 
//           if(this.state.type === 'questions') {
//             console.log('inside questions'); 
//            return ( 
//                this.renderAll()
//                 );
        
     
//     }
// }
this.props.history.push('/content/allContent');
  }

  open = (e) => {

      this.setState ({
          type : e.target.id
      })
      console.log(e.target.id);
  }
  
  
  renderAll () {

    console.log('in render all');
    console.log(this.state.contents);
    console.log(this.state.contents[0].Questions);
 
    let questions = this.state.contents.map(content => {
    
    return(
    <div >
    <Link to ='/content'>{content.Question}</Link>
   
    <p>Added {content.PostedTime }</p>
   <hr /> 
    </div>
    
    
    )
  
})
    return (

       
        <div  style={{ left:"200px", top : "50px", width : "800px"}} >
        {questions}
        </div>
       
     
  );
  }


openTopics ()  {
    console.log('open topics');
    console.log(this.state.type);
    
    if(this.state.type === 'all') {
    return (
        <div class="component"> 
            <Topic  class="component" key = " 1" ></Topic>
            </div>
    );

    }
}

openTopic = (e) => {
    this.setState({
        type : 'all'
    
       });
}

updateSearch =(e) => {

    this.setState({
        search : e.target.value
    
       });
}


searchByTopic = (e) => {
    

}


    sortActivity = (e) => {
        e.preventDefault()
        console.log("inside sort  activity");
        console.log(e.target);
        
        this.state.filteredContent = this.state.activity;
        console.log(this.state.filteredContent);

    if(e.target.id == 'new') {
        this.state.filteredContent.sort( (a,b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() ;
    });

    console.log(this.state.filteredContent);

    }   
    if(e.target.id  == 'old') {
    this.state.filteredContent.sort( (a,b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() ;
});  
console.log(this.state.filteredContent);


}
this.setState({ state: this.state });
}

filterByYear = (e) => {
    console.log("inside filter by year");
    console.log(e.target.id);
    if(e.target.id == 0) 
    this.state.filteredContent = this.state.activity
    else 
    this.state.filteredContent = this.state.activity.filter( element => new Date(element.createdAt).getFullYear() == e.target.id)
    console.log(this.state.filteredContent);
    this.setState({ state: this.state });
    
}

filter =(e) => {

    console.log(e.target.id )
    if(e.target.id === 'all') {
    this.state.filteredContent = this.state.activity
    }
    else  {
    this.state.filteredContent = this.state.activity.filter( element => element.action == e.target.id)
    }
    this.setState({ state: this.state });
}

renderData (){

var options = {year: 'numeric', month: 'long', day: 'numeric' };


return (
    
    <div  style={{ left:"200px", top : "50px", width : "800px"}} >
                {

    this.state.filteredContent.map(content => {
     if(content.action == 'question') {
        return(
            <div >
            <Link class ="questionLink" to ='/content'>  Your Answer to {content.question[0].Question}</Link>
           
            <p class ="size-sm">Asked {new Date(content.createdAt).toLocaleDateString("en-US", options) }</p>
           <hr /> 
            </div>
        
        
        )
     }
     else if (content.action == 'answer') {
        return(
            <div >
            <Link class ="questionLink" to ='/content'>  {content.question[0].Question}</Link>
           
            <p class ="size-sm">Added {new Date(content.createdAt).toLocaleDateString("en-US", options) }</p>
           <hr /> 
            </div>
        
        
        ) 
     }

     else if (content.action == 'follow') {
        return(
            <div >
            <Link class ="questionLink" to ='/content'>  {content.question[0].Question}</Link>
           
            <p class ="size-sm">Followed {new Date(content.createdAt).toLocaleDateString("en-US", options) }</p>
           <hr /> 
            </div>
        
        
        ) 
     }
     else {

     }
      
    })
  }
    </div>
)
}


    render(){
    
        return(
            <div>
            <div class ="sidebar">
            <div class="col-md-3 width1" >
            <p class="heading"> By Content Type </p>
                        <hr class ="hr"></hr>
                        <div class="btn-group-vertical">
                        <button id='all' class="button-content " default = "active" onClick ={this.filter} ><span class ="size-sm" >All Types </span></button>
                        <button id='question' class="button-content" onClick ={this.filter}  > <span class ="size-sm" >Questions Asked </span></button>
                        <button id='follow' class="button-content" onClick ={this.filter}  > <span class ="size-sm" >Questions Followed </span></button>
                        <button  id='answer' class="button-content" onClick ={this.filter} > <span class ="size-sm" >Answers </span></button>
                        <button  id='posts' class="button-content"  onClick ={this.filter} > <span class ="size-sm" >Posts </span></button>
                        </div>

                        <br>
                        </br>
                        <br>
                        </br>
            
            
            <p class="heading"> By Topic </p>
            <hr class ="hr"></hr>
            
            <div class ="spacing">
            <p class="pStyle">All Topics</p>
            <input type ='text' class = 'size-sm inputBox' placeholder='Search for a topic' onchange={this.updateSearch} ></input>
            </div>
           
      
            
            
            <br></br>
            <br></br> 
            <p class="heading"> By Year </p>
            <hr class ="hr"></hr>
            <div class="btn-group-vertical">
            <button id="0" class="button-content"  onClick = {this.filterByYear}><span class ="size-sm" >All Time </span></button>
            <button   id="2019" class="button-content" onClick = {this.filterByYear} > <span class ="size-sm" >2019</span></button>
            <button  id="2018" class="button-content"  onClick = {this.filterByYear} > <span class ="size-sm" >2018</span></button>
            <button  id="2017" class="button-content"  onClick = {this.filterByYear} > <span class ="size-sm" >2017</span></button>
            <button   id="2016" class="button-content"   onClick = {this.filterByYear}  > <span class ="size-sm" >2016</span></button>
            </div>
            
            
            <br></br>
            <br></br>  
            
            <p class="heading"> Sort Order </p>
            <hr class ="hr"></hr>
            <div class="btn-group-vertical">
            <button  id="new"  class="button-content" onClick={this.sortActivity.bind(this)} ><span class ="size-sm" >Newest First</span></button>
            <button id="old" class="button-content" onClick={this.sortActivity.bind(this)}  > <span   class ="size-sm" >Oldest First</span></button>
            
            </div>
         
            </div>
         
</div>
            

            <div class="col-md-3" style={{ left:"300px", top : "70px"}} >
            <p class="heading" > Your Content </p>
            <hr style ={{ width : "800px"}}></hr>
            {this.renderData()}
            </div>
            

                  
            
             </div>


        )
    }
}

export default ContentHome;


