import React, { Component } from 'react';
import Header from '../Header/Header'
import News from '../news/News'
import Topics from '../Topics/topics'
import topic1 from '../../images/topic.png'

class Topic extends Component {
      
  constructor(props){
     
    super(props);

    this.state = {
       questions : []

  }
}

    render() { 

        let questions = this.state.questions.map((q) => {
            return (
                <div class="row">
                    <div class="col-md-1">
                    <img  class="icons" src={topic1} value="topic"/>
                    </div>
                    <div class="col-md-3">
                    <b>Running </b>
                    </div>
                    </div>
            )
        })

        return (
            <div>
           <Header/>
                <div class="row">
                    <div class="col-md-2">
                    <Topics/>
                    </div>
                    <div class="col-md-7">
                         <div class="card mt-3"  style={{"width": "50rem"}}>
                    <div class="card-header">
                            Topic
                    </div>
                    <div class="card-body">
                    <div class="row">
                    <div class="col-md-1">
                    <img  class="icons" src={topic1} value="topic"/>
                    </div>
                    <div class="col-md-3">
                    <b>Running </b>
                    </div>
                    </div>
                    </div>

                    {questions}
                   
                </div>

                    </div>
                    <div class="col-md-3">
                    <Topics/>
                    </div>
                </div>
            
             </div>
          );
    }
}
 
export default Topic;