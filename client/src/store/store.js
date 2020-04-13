import {createStore,applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from "../reducers/"

const intialState=[]

const middleWare =[thunk];


const store = createStore(rootReducer,intialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store