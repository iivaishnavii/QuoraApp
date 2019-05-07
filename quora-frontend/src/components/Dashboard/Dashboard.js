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
            mostViewedAnswers : [],
            views : []

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


        // axios.get('http://'+rooturl+`:4000/getTopBookmarks`) .then(response => {
        //     //update the state with the response data
        //     console.log("graph data1")
        //     console.log(response.data)
        //     this.setState({
        //         bookmarkedAnswers : this.state.bookmarkedAnswers.concat(response.data) 
        //     });
        // });

        axios.get('http://'+rooturl+`:4000/getTopViews`) .then(response => {
            //update the state with the response data
            console.log("graph data1")
            console.log(response.data)
            this.setState({
                mostViewedAnswers : this.state.mostViewedAnswers.concat(response.data) 
            });
        });


        const data = {
            Email : "jessicatony@gmail.com"
        }
       

       axios.post('http://'+rooturl+`:4000/getProfileviews`,data) .then(response => {
               //update the state with the response data
               console.log("graph data3")
               console.log(response.data)
               this.setState({
                views : this.state.views.concat(response.data) 
               });
           });
           
    }

    render() { 

    console.log("graph3");

    let  upvoteData = [];
    let downvoteData = [];
    let viewsData = [];
    let bookmarkData = [];
    let answerData = [];

    if(this.state.upvotedAnswers.length > 0) {
        upvoteData = this.state.upvotedAnswers[0].graph;
    }

    if(this.state.downvotedAnswers.length > 0) {
        downvoteData = this.state.downvotedAnswers[0].graph;
    }

    // if(this.state.bookmarkData.length > 0) {
    //     bookmarkData = this.state.bookmarkData[0].graph;
    // }

    if(this.state.views.length > 0) {
        viewsData = this.state.views[0].graph;
        
    }

    if(this.state.mostViewedAnswers.length > 0) {
        answerData = this.state.mostViewedAnswers[0].graph;
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
				text: "Top Bookmarked Answers"
			},
			axisY: {
				title: "Bookmarks",
				includeZero: false,
                
			
			},
			axisX: {
				title: "Answers",
				interval: 1
			},
			data: [{
				type: "splineArea",
				dataPoints: bookmarkData
			}]
        }

        const options4 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", 
			title:{
				text: "Top Viewed Answers"
			},
			axisY: {
				title: "Views",
				includeZero: false,
                
			
			},
			axisX: {
				title: "Answers",
				interval: 1
			},
			data: [{
				type: "splineArea",
				dataPoints: answerData
			}]
        }

        const options5 = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", 
			title:{
				text: "Profile Views"
			},
			axisY: {
				title: "Views",
				includeZero: true,
                
			
			},
			axisX: {
				title: "Days",
				interval: 2
			},
			data: [{
				type: "splineArea",
				dataPoints: viewsData
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

                        <br>
                    </br><br>
                    </br>

                    <br>
                                        </br><br>
                    </br>

                    <CanvasJSChart class= "graph2" options = {options5} style={{width: "500px"}}
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