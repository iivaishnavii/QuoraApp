import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware,compose, createStore,combineReducers} from 'redux';
import {Provider } from 'react-redux';

 import loginReducer from './reducers/loginReducer';
import { reducer as formReducer } from "redux-form";
import promise from 'redux-promise';
import thunk from 'redux-thunk';

const allreducers = combineReducers ({
   
    login : loginReducer,
    // signup : signupReducer,
    form : formReducer
    // course : courseReducer,
    
    // profile : profileReducer
})

const allstoreenhancers = compose (applyMiddleware(promise,thunk), window.devToolsExtension && window.devToolsExtension());

const store = createStore(allreducers,allstoreenhancers

);


ReactDOM.render(<Provider store = {store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();