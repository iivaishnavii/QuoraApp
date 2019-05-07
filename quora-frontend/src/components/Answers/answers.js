import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header/Header'
import '../Answers/answers.css'
import { Redirect } from 'react-router'

class answer extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            questionId : props.location.state.questionid,
            results : [],
            question : "",
            author :"",
            showAnswerDialog : false,
            open: false,
            answer : "",
            redirectToMyAnswersPage : false,
            displayOnlyQuestions:false,
            selectedFile : null,
            imageId : 0,
            img0: '',
            img1: '',
            img2: '',
            img3 : ''
        }
        console.log("Props"+JSON.stringify(props.location.state.questionid))
    }
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    componentWillMount()
    {
        console.log("Inside component did mount"+this.state.questionId)
        console.log("Question ID"+this.state.questionId)
        var url = `http://localhost:4000/getAnswers/`+this.state.questionId
        console.log(url)  
        axios.get(url).
        then(response => {
               if(response.data.Answers.length>0)
               {
                console.log("in then")
                console.log(response.data)
                this.setState({results : this.state.results.concat(response.data.Answers)})
                console.log("After setting",this.state.results.Answers)
                this.setState({question:this.state.results[0].question})
               }
               else
               {
                this.setState({results : this.state.results.concat(response.data)})
                console.log(this.state.results[0])
                this.setState({question:this.state.results[0].Question})
                this.setState({displayOnlyQuestions:true})
                console.log(this.state.question)
               }
                
            
               
        })
        document.addEventListener("mousedown", this.handleClickOutside);

    }
    handleUpvote=(event,answerid)=>{
        if(event.currentTarget.dataset.id==answerid)
        {
            //console.log("clicked"+questionid)
             var data = {
            "answerid":answerid,
            "questionid":this.state.questionId
            }
        axios.post('http://localhost:4000/upvoteAnswer',data)
        .then(res=>
            {
                console.log("Success"+res)
                //this.setState({upvotedItem:res})
                window.location.reload();

            }
            
          )
          .catch(res=>console.log("Fail"))
        }
       // console.log("Answer id"+val)
       
    }
    uploadImage=(e)=>{
        console.log("File"+e.target.files[0])
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
    
      handleClickOutside = event => {
        if (this.container.current && !this.container.current.contains(event.target)) {
          this.setState({
            open: false,
          });
        }
      };
    writeAnswer=(e)=>{
        this.setState({showAnswerDialog:true})
        
    }
    handleButtonClick = () => {
        this.setState(state => {
          return {
            open: !state.open,
          };
        });
      };

    fileSelectedHandler=(e)=>{
        this.setState({selectedFile :e.target.files[0] })
    }

    fileUpload = (e)=>{
        const data = new FormData() 
        data.append('selectedFile', this.state.selectedFile)
        console.log('Selected File'+this.state.selectedFile)
        var num = Math.floor((Math.random() * 1000) + 1);        
        axios.post('http://localhost:4000/addpicforanswer/'+num,data)
        .then(res=>{
            console.log("Upload successfully")
            this.setState({imageId:num})
            console.log("ImageID"+this.state.imageId)
        })

    }

    handleSubmit = (e)=>{
        if(this.state.isAnonymous===1)
        {
            var data={
                "answer" : this.state.answer,
                "owner" : "Shivani@gmail.com",
                "isAnonymous":1,
                "date":"05-05-2019",
                "question":this.state.question,
                
            }
            console.log("In anonymous block")
            axios.post('http://localhost:4000/writeAnswer/',data)
            .then(response=>{
                console.log("Wrote an Answer Successfully")
                this.setState({redirectToMyAnswersPage:true})
            })
            .catch(response=>{
                console.log("Exception")
            })
        }
        else
        {
            var data={
                "answer" : this.state.answer,
                "owner" : "Shivani@gmail.com",
                "isAnonymous":0,
                "date":"05-05-2019",
                "question":this.state.question,
                
            }
            axios.post('http://localhost:4000/writeAnswer/',data)
            .then(response=>{
                console.log("Wrote an Answer Successfully")
                this.setState({redirectToMyAnswersPage:true})
            })
            .catch(response=>{
                console.log("Exception")
            })
        }
 
       // this.setState({showAnswerDialog:false})
        
    }

    handleClose = (e) =>{
        this.setState({showAnswerDialog:false})
    }
    
    setAnswer = (e)=>{
        this.setState({answer:e.target.value})
    }

    container = React.createRef();
      state = {
        open: false,
      };

      handeleAnonymity= (e)=>{
          this.setState({"isAnonymous":1})
          this.setState({showAnswerDialog:true})

      }
      renderAnswer=(data,index)=>{
         if(data[0].img.data[0]!=0)
         {
            console.log("File"+JSON.stringify(data[0].img.data.data))
            var base64Flag = 'data:image/jpeg;base64,';

         }
          
        //  var imageStr = this.arrayBufferToBase64(data[0].img.data.data);
        //  console.log("Image String"+imageStr)
        //  console.log("index"+index)
        //  var left = 'img'+index;
         //console.log(left+imageStr)
         //this.setState({left:base64Flag+imageStr})
//return(<img src={this.state.img}/>)
      }
    render() { 
        let redirectvar = null
        if(this.state.redirectToMyAnswersPage === true)
            redirectvar = <Redirect to="/newsfeed" />
        let displayQuestion = <div className="mt-3 questioncss"><b>{this.state.question}</b></div>
        let displayanswedraft = null;
        if(this.state.showAnswerDialog === true)
        {
            displayanswedraft=
            <div>
                <div>
                    <input type="file" onChange={this.fileSelectedHandler}></input>
                    <button className="mt-2 btn-primary" onClick={this.fileUpload}>Add Image</button>
                </div>
                <div class="mt-2">
                    <textarea class="form-control" rows="5" id="comment" onChange={this.setAnswer}></textarea>
                    <button className="btn-primary mt-3" onClick={this.handleSubmit}>Submit</button>
                    <button className="btn-primary ml-2" onClick={this.handleClose}>Close</button>
                </div>
            </div>
        }
        let displayAnswers =  null
        if(this.state.displayOnlyQuestions===false)
        {
            displayAnswers=this.state.results.map((answer,index)=>{
                return(
                    <div>
                        <div class="feed-user-pic row">
                            <img class="pic ml-3" src="https://cdn2.stylecraze.com/wp-content/uploads/2013/07/10-Pictures-Of-Katy-Perry-Without-Makeup.jpg"/>
                            <p class="ml-2">{answer.owner}</p>
                        </div>
                        <p style={{"backgroundColor":"bg-light"}}>{answer.answer}</p>
                        {/*this.renderAnswer(answer.images,index)*/}
                        <div>
                        {answer.imageURL!=""?<img src={answer.imageURL} style={{"width":100,"height":100}}/>:null}
                            
                        </div>
                        <button style={{"font-size":"15px"}} class="transButton" onClick={e=>{this.handleUpvote(e,answer._id)}} data-id={answer._id}
><label class="QuoraLabels"><b>Upvote</b></label><i class="fa fa-arrow-circle-up ml-1"></i></button>
                        <label class="ml-1">{answer.upVotes}</label>
                        <button class="ml-3 transButton" style={{"font-size":"15px"}}><label class="QuoraLabels"><b>Share</b></label><i class="fa fa-share-square ml-1"></i></button>
                        <label class="ml-1">6</label>
                        
                        <button class="ml-3 transButton" style={{"font-size":"15px","float":"right"}}><label class="QuoraLabels"><b>Downvote</b></label> <i class="fa fa-arrow-circle-down"></i></button>
                        <button class="transButton" style={{"float":"right"}}><i class="fas fa-ellipsis-h ml-3" ></i></button>
                        <div class='card-header'>
                            <input type="text" style={{"width":"800px"}} placeholder="Add comment"/>
    
                        </div>
                        
                        <hr></hr>
                    </div>
                    
                )
            })
        }
       // }
        
    

        let answerbar = <div class="container mt-0" ref={this.container}>
            <button class="transButton ml-3" onClick={this.writeAnswer}>Answer</button>
            <button class="transButton ml-3">Follow</button>
            <button class="transButton ml-3">Request</button>
            <button class="transButton" style={{"float":"right"}} onClick={this.handleButtonClick} name="ellipsis"><i class="fas fa-ellipsis-h ml-3" ></i></button>
            {this.state.open && (
                <div class="dropdown">
                <ul>
                    <li onClick={this.handeleAnonymity}>Answer Anonymously</li> 
                </ul>
            </div>
            )}
        </div>
        
        return ( 
            <div>
                {redirectvar}
                <Header/>
                
                <div class="row">
                    <div class="col-md-2 ">
                    1 of 3
                    </div>
                    <div class="col-md-7">
                        {displayQuestion}
                        {answerbar}
                        {displayanswedraft}
                        <hr></hr>
                        {displayAnswers}
                    </div>
                    <div class="col-md-3 ">
                    3 of 3
                </div>
            </div>

            </div>
         );
    }
}
 
export default answer;