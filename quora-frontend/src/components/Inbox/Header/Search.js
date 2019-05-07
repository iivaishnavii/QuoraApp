import React, { Component } from 'react';
import axios from 'axios'
import Select from 'react-select'
import {Link} from 'react-router-dom';
import './Search.css'


class Search extends Component {
    state = {
        searchResults : []
      }

    componentDidMount(){
        console.log(this.state.questionid)
        axios.get('http://localhost:4000/getAllQuestions').
        then(questions=>{
           console.log("Search"+JSON.stringify(questions))
            var results=[];
            questions.data.forEach(ele=>{
                console.log(ele)
                var obj = {label:ele.Question,value:ele._id}
                ele.Topics.forEach(x=>{
                    var obj2 = {label:x,value :x}
                    results.push(obj2)
                })
                results.push(obj)
                
            })
            this.setState({searchResults:results})

        })
    }

    handleSearch=(e)=>{
        console.log("searching.."+this.state.questionid)
        window.open('http://localhost:3000/answers', "_self")
    }
    
    render() { 
        return ( 
            <div>

                <div className="container" style={{marginTop:"-3%",backgroundColor:"#F8F8F8", width : 340, height : 90}}>
                     <Select style={{marginTop:"0%"}} options={this.state.searchResults} onChange={opt=>
                        {console.log(opt.label,opt.value)
                         this.setState({questionid:opt.value},function () {
                            console.log("State"+this.state.questionid);
                        });
                         
                        }
                    }/>
                   <Link to={{pathname : "/answers",state :{'questionid':this.state.questionid}} }  > 
                     <button class="btn btn-outline-success" style={{"fontSize":"small"}} type="submit" onClick={this.handleSearch}>Search </button>      </Link>             
                </div>
            </div>
         );
    }
}
 
export default Search;