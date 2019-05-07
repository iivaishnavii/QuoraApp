import React, { Component } from 'react';
import Header from '../Header/Header'
import '../Dashboard/dashboard.css'
import  CanvasJSReact from '../../canvasjs/canvasjs.react';
import {rooturl} from '../../config/settings';
import axios from 'axios';
import {Link} from 'react-router-dom';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            upvotedAnswers: [],
            downvotedAnswers : [],
            bookmarkedAnswers : [],
            mostViewedAnswers : []

            }
    }

    componentDidMount() {
    
       

       axios.get('http://'+rooturl+`:4000/getTopUpvotes`) .then(response => {
               //update the state with the response data
               console.log("graph data1")
               console.log(response.data)
               this.setState({
                upvotedAnswers : this.state.upvotedAnswers.concat(response.data) 
               });
           });

           axios.get('http://'+rooturl+`:4000/getTopDownvotes`) .then(response => {
            //update the state with the response data
            console.log("graph data1")
            console.log(response.data)
            this.setState({
             downvotedAnswers : this.state.downvotedAnswers.concat(response.data) 
            });
        });
           
    }

    render() { 

    console.log("graph3");

    let  upvoteData = [];
    let downvoteData = [];
    if(this.state.upvotedAnswers.length > 0) {
        upvoteData = this.state.upvotedAnswers[0].graph;
    }

    if(this.state.downvotedAnswers.length > 0) {
        downvoteData = this.state.downvotedAnswers[0].graph;
    }


        const options1 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", 
			title:{
				text: "Top Upvoted Answers"
			},
			axisY: {
				title: "Upvotes",
				includeZero: false,
                
			
			},
			axisX: {
				title: "Answers",
				interval: 1
			},
			data: [{
				type: "splineArea",
				dataPoints: upvoteData
			}]
        }

        const options2 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", 
			title:{
				text: "Most Downvoted Answers"
			},
			axisY: {
				title: "Downvotes",
				includeZero: false,
                
			
			},
			axisX: {
				title: "Answers",
				interval: 1
			},
			data: [{
				type: "splineArea",
				dataPoints: downvoteData
			}]
        }

        const options3 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", 
			title:{
				text: "Top Downvoted Answers"
			},
			axisY: {
				title: "Downvotes",
				includeZero: false,
                
			
			},
			axisX: {
				title: "Answers",
				interval: 1
			},
			data: [{
				type: "splineArea",
				dataPoints: upvoteData
			}]
        }

        const options4 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", 
			title:{
				text: "Top Upvoted Answers"
			},
			axisY: {
				title: "Upvotes",
				includeZero: false,
                
			
			},
			axisX: {
				title: "Answers",
				interval: 1
			},
			data: [{
				type: "splineArea",
				dataPoints: upvoteData
			}]
        }


    
        
        
        return (
            <div>
           <Header/>
                <div class="row">
                    <div class="col-md-6 graph1">
                    <CanvasJSChart class= "graph1" options = {options1}
                        onRef={ref => this.chart = ref} />
                    <br>
                    </br><br>
                    </br>

                    <br>
                                        </br><br>
                    </br>
                        <CanvasJSChart class= "graph1" options = {options2}
                        onRef={ref => this.chart = ref} />


                    </div>
                    <div class="col-md-6 graph1">
                    <CanvasJSChart class= "graph1" options = {options3}
                    onRef={ref => this.chart = ref} />
                    <br>
                    </br><br>
                    </br>

                    <br>
                    </br><br>
                    </br>

                    <CanvasJSChart class= "graph1" options = {options4}
                        onRef={ref => this.chart = ref} />
                    </div>
                   
                </div>
            
             </div>
          );
    }
}
 
export default Dashboard;


// <div>
// <Header/>
//      <div class="row">
//          <div class="col-md-3">
//          <button  style={{width : "200px"}}  class="graphbtn btn-default btn-lg"  value ="Upvotes"> <i class="fa fa-arrow-up fa-md"></i> &nbsp; UPVOTES</button>
    
// <div   class="col-md-3" class = "graph1"  style = { { left : "200px", top : "100px" ,width : "300px"}  }>
 
// <CanvasJSChart options = {options}
// onRef={ref => this.chart = ref} />


// <CanvasJSChart options = {options}
// onRef={ref => this.chart = ref} />
        
//         </div>

//         <div   class="col-md-7" class = "graph1"  style = { { left : "200px", top : "100px" ,width : "300px"}  }>
 
//         <CanvasJSChart options = {options}
//         onRef={ref => this.chart = ref} />
                   
//                    </div>
        
//          </div>
         
//          <div class="col-md-5">
//          <button  style={{width : "220px"}}  class="graphbtn btn-default btn-lg"  value ="Downvotes"> <i class="fa fa-arrow-down fa-md"></i> &nbsp; DOWNVOTES</button>
//          </div>
//          <div class="col-md-3">
        
//          </div>
//      </div>
 
//   </div>