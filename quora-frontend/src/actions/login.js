
import axios from "axios";
import {rooturl} from '../config/settings';
export const AUTH_LOGIN = "AUTH_LOGIN";
export const SIGNUP = "SIGNUP";


export const AUTH_LOGIN_USER_PRESENT = "AUTH_LOGIN_USER_PRESENT";


//target action
export function submitLogin(data) {
    return function (dispatch) {
        console.log('Inside Action');
        console.log(data);
      //  axios.defaults.withCredentials = true;
        axios.post('http://'+rooturl+':4000/login', data)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log("inside 200");
                    localStorage.setItem("token", response.data.Token);

                    var resultData = {
                        email : response.data.result.Email,
                        credential : response.data.result.ProfileCredential,
                        name : response.data.result.name,
                        isAuthenticated : true
        
                    }
                    localStorage.setItem('email',response.data.result.Email);
                    localStorage.setItem('credential',response.data.result.ProfileCredential);
                    localStorage.setItem('credential',response.data.result.name);
                    console.log('Result in action: ', resultData)
                    dispatch({
                        type: AUTH_LOGIN,
                        payload: resultData
                    });

                }                               
            })
            .catch((err) => {
                if (err) {
                   // if (err.response.status === 401) {
                    var resultData = {
                        isAuthenticated : false
                    }
                       console.log(err);
                        console.log('inside res status 401', err);
                        dispatch({
                            type: AUTH_LOGIN,
                            payload: resultData
                        });                        
                    
                }

            });
    }
}




export function signup(data) {
    return function (dispatch) {
        console.log('Inside Signup');
   //     axios.defaults.withCredentials = true;
        axios.post('http://'+rooturl+':3001/signUp', data)
            .then(response => {
                console.log('response', response.data);
                if (response.status === 200) {
                    var result = {
                        isNewUserCreated: true
                    }

                    dispatch({
                        type: SIGNUP,
                        payload: result
                    });
                }
                if(response.status === 210){
                    console.log('User already present:');
                    dispatch({
                        type: AUTH_LOGIN_USER_PRESENT                       
                    });
                } 
            })
            .catch((err) => {
                console.log('Error Occured!');
                var result = {
                    errorRedirect: true
                }

                dispatch({
                    type: SIGNUP,
                    payload: result
                });
            });

    }
}