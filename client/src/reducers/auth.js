import {
    LOAD_USER,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    LOG_OUT
} from "../actions/types"
import setAuth from '../utils/setAuth'

const intialState={
    token:null,
    user:null,
    loading:true,
    isAuthenticated:false
}


export default function (state=intialState,action){
    const {payload, type}=action
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        setAuth(payload.token)//add token to header
        return{
            ...state,
            loading:false,
            isAuthenticated:true,
            ...payload,//toke
        }
        case LOG_OUT:
        case AUTH_ERROR:
        case REGISTER_FAILURE:
        case LOGIN_FAIL:
        localStorage.removeItem("token")
        console.log(localStorage)
        return{
            ...state,
            token:null,
            loading:false, 
            isAuthenticated:false,
            user:'',
        }
        case LOAD_USER:
        return{
            ...state,
            loading:false,
            user:payload,
            isAuthenticated:true
        }
        default:
            return state
}
}