import React, { Component } from 'react';
import axios from 'axios'
import Select from 'react-select'
import {Link} from 'react-router-dom';
import './Search.css'


class Search extends Component {
    state = {
        searchResults : [],
        type:''
      }

    componentDidMount(){
        console.log(this.state.questionid)
        var results=[];
        axios.get('http://localhost:4000/getAllQuestions').
        then(questions=>{
           console.log("Search"+JSON.stringify(questions))
           // var results=[];
            questions.data.forEach(ele=>{
                console.log(ele)
                var obj = {label:ele.Question,value:{'id':ele._id,'type':'question'}}
                ele.Topics.forEach(x=>{
                    var obj2 = {label:x,value :x}
                    results.push(obj2)
                })
                results.push(obj)
            })
        })
        axios.get('http://localhost:4000/getUsers').
        then(users=>{
            console.log("Set of users"+JSON.stringify(users));
            users.data.forEach(ele=>{
                var obj={label:ele.Name,value:{'email':ele.Email,'type':'person'}}
               // var obj={label:ele.Name,value:ele.Email}
                results.push(obj)
            })
        })
        .catch(err=>console.log(err))

        axios.get('http://localhost:4000/getAllTopics').
        then(topics=>{
            console.log("Set of topics"+JSON.stringify(topics));
            topics.data.forEach(ele=>{
                var obj={label:ele.topicName,value:{'topic':ele.topicName,'type':'topic'}}
               // var obj={label:ele.Name,value:ele.Email}
                results.push(obj)
            })
        })
        .catch(err=>console.log(err))
        console.log("Search Results"+results)
        
        this.setState({searchResults:results})

    }

    handleSearch=(e)=>{
        console.log("searching.."+this.state.questionid)
        window.open('http://localhost:3000/answers', "_self")
    }
    
    render() { 




        return ( 
            <div>
<div className = "row">

<div className = 'col-sm-4' > 
                <div className="container" style={{marginTop:"-3%",backgroundColor:"#F8F8F8", width : 340, height : 90}}>
                     <Select style={{marginTop:"0%"}} options={this.state.searchResults} onChange={opt=>
                        {
                            if(opt.value.type=='person')
                            {
                                console.log(opt.label,opt.value.type)
                                this.setState({type:opt.value.type})
                                this.setState({email:opt.value.email})
                                
                            }
                            else if(opt.value.type=='question')
                            {
                                this.setState({type:opt.value.type})
                                this.setState({questionid:opt.value.id},function () {
                                    console.log("State"+this.state.questionid);
                                     });
                            }
                            else
                            {
                                this.setState({type:opt.value.type})
                                this.setState({topic:opt.value.id},function () {
                                    console.log("State"+this.state.questionid);
                                     });
                            }
                            
                         
                        }
                    }/>   


                </div>

               
            </div>

            <div  className = 'col-sm-4' >
            {this.state.type=='person'?
            <a href={`http://localhost:3000/profile/answers/${this.state.email}`}>
            <button class="btn btn-outline-success" style={{"fontSize":"medium", marginLeft: 150 , marginTop : 20}} type="submit" onClick={this.handleSearch}>Search </button></a> 
            :this.state.type=='topic'?
            <a href='http://localhost:3000/newsfeed/topic/running'><button class="btn btn-outline-success" style={{"fontSize":"medium", marginLeft: 150 , marginTop : 20}} type="submit" onClick={this.handleSearch}>Search </button></a> 
            :<Link to={{pathname : "/answers",state :{'questionid':this.state.questionid}} }  > 
            <button class="btn btn-outline-success" style={{"fontSize":"medium", marginLeft: 150 , marginTop : 20}} type="submit" onClick={this.handleSearch}>Search </button></Link>  
            }        
          
            </div>
            </div>
            </div>
         );
    }
}
 
export default Search;